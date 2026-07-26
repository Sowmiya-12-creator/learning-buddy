from fastapi import APIRouter, Depends, HTTPException

from app.schemas.ai import AIQuestionRequest
from app.schemas.ai_response import AIResponse
from app.services.ai_service import generate_ai_response
from app.services.chat_service import (
    add_chat_message,
    get_chat_session,
    update_chat_title
)
from app.dependencies.auth import get_current_user
from app.database.connection import users_collection


router = APIRouter()


@router.post("/ai/ask", response_model=AIResponse)
def ask_ai(
    request: AIQuestionRequest,
    current_user=Depends(get_current_user)
):

    user_email = current_user["email"]

    user = users_collection.find_one(
        {"email": user_email}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    conversation_context = None

    # ========================================================
    # Load Previous Conversation
    # ========================================================

    if request.session_id:

        chat_session = get_chat_session(
            session_id=request.session_id,
            user_email=user_email
        )

        if not chat_session:
            raise HTTPException(
                status_code=404,
                detail="Chat session not found"
            )

        previous_messages = chat_session.get(
            "messages",
            []
        )

        if previous_messages:

            context_lines = []

            for message in previous_messages:

                sender = (
                    "Student"
                    if message["sender"] == "user"
                    else "Learning Buddy"
                )

                context_lines.append(
                    f"{sender}: {message['text']}"
                )

            conversation_context = "\n".join(
                context_lines
            )

        # Save learner's new message
        add_chat_message(
            session_id=request.session_id,
            user_email=user_email,
            sender="user",
            text=request.question
        )

    # ========================================================
    # Generate AI Response
    # ========================================================

    ai_response = generate_ai_response(
        question=request.question,
        learning_level=user.get(
            "learning_level",
            "General"
        ),
        preferred_language=user.get(
            "preferred_language",
            "English"
        ),
        learning_goal=user.get(
            "learning_goal",
            "Learn New Skills"
        ),
        conversation_context=conversation_context
    )

    # ========================================================
    # Save AI Response
    # ========================================================

    if request.session_id:

        # ----------------------------------------------------
        # Visual Steps
        # ----------------------------------------------------

        visual_steps = [
            step.model_dump()
            for step in (
                ai_response.visual_steps or []
            )
        ]

        # ----------------------------------------------------
        # Avatar Sections
        # ----------------------------------------------------

        avatar_sections = [
            section.model_dump()
            for section in (
                ai_response.avatar_sections or []
            )
        ]

        # ----------------------------------------------------
        # Visual Teaching
        #
        # May be None for conversation or specific requests
        # such as "give only an example".
        # ----------------------------------------------------

        visual_teaching = (
            ai_response.visual_teaching.model_dump()
            if ai_response.visual_teaching
            else None
        )

        # ----------------------------------------------------
        # Determine Main Chat Text
        #
        # Explanation is no longer always required.
        #
        # Example-only:
        #   use example
        #
        # Key-points-only:
        #   use key points
        #
        # Visual-only:
        #   use visual description
        # ----------------------------------------------------

        if ai_response.explanation:

            chat_text = ai_response.explanation

        elif ai_response.example:

            chat_text = ai_response.example

        elif ai_response.key_points:

            chat_text = "\n".join(
                f"• {point}"
                for point in ai_response.key_points
            )

        elif ai_response.visual_teaching:

            chat_text = (
                ai_response.visual_teaching.description
            )

        else:

            chat_text = ""

        # ----------------------------------------------------
        # Save AI Message
        # ----------------------------------------------------

        add_chat_message(
            session_id=request.session_id,
            user_email=user_email,
            sender="ai",
            text=chat_text,
            topic=ai_response.topic,
            visual_steps=visual_steps,
            narration=ai_response.narration,
            avatar_sections=avatar_sections,
            visual_teaching=visual_teaching
        )

        # ====================================================
        # Update Chat Title
        #
        # Only update when AI provides a real topic.
        # Conversation messages such as "Hi" and "Thank you"
        # may have topic=None.
        # ====================================================

        if ai_response.topic:

            update_chat_title(
                session_id=request.session_id,
                user_email=user_email,
                title=ai_response.topic
            )

    # ========================================================
    # Return Response to Frontend
    # ========================================================

    return ai_response                