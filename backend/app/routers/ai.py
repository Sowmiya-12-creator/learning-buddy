from fastapi import APIRouter, Depends

from app.schemas.ai import AIQuestionRequest
from app.schemas.ai_response import AIResponse
from app.services.ai_service import generate_ai_response
from app.dependencies.auth import get_current_user
from app.database.connection import users_collection

router = APIRouter()


@router.post("/ai/ask", response_model=AIResponse)
def ask_ai(
    request: AIQuestionRequest,
    current_user=Depends(get_current_user)
):

    user = users_collection.find_one(
        {"email": current_user["email"]}
    )

    answer = generate_ai_response(
        question=request.question,
        learning_level=user.get("learning_level", "General"),
        preferred_language=user.get("preferred_language", "English"),
        learning_goal=user.get("learning_goal", "Learn New Skills")
    )

    return AIResponse(
        answer=answer
    )