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

    conversation_context = None

    # If a chat session is provided,
    # retrieve its previous conversation.
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

        # Save the new user question.
        add_chat_message(
            session_id=request.session_id,
            user_email=user_email,
            sender="user",
            text=request.question
        )

    # Generate personalized AI response
    # using previous conversation context.
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

    # Save the AI response.
    if request.session_id:

        visual_steps = [
            step.model_dump()
            for step in ai_response.visual_steps
        ]

        add_chat_message(
            session_id=request.session_id,
            user_email=user_email,
            sender="ai",
            text=ai_response.explanation,
            topic=ai_response.topic,
            visual_steps=visual_steps,
            narration=ai_response.narration
        )

        # Automatically rename "New Chat"
        # using the topic from the first AI response.
        update_chat_title(
            session_id=request.session_id,
            user_email=user_email,
            title=ai_response.topic
        )

    return ai_response