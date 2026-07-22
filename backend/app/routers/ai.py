from fastapi import APIRouter
from app.schemas.ai import AIQuestionRequest
from app.schemas.ai_response import AIResponse
from app.services.ai_service import generate_ai_response

router = APIRouter()


@router.post("/ai/ask", response_model=AIResponse)
def ask_ai(request: AIQuestionRequest):

    answer = generate_ai_response(request.question)

    return AIResponse(
        answer=answer
    )