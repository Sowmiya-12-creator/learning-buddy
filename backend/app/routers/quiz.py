from fastapi import APIRouter
from app.schemas.quiz import QuizRequest, QuizResponse
from app.services.quiz_service import generate_quiz

router = APIRouter()


@router.post("/quiz/generate", response_model=QuizResponse)
def create_quiz(request: QuizRequest):

    quiz = generate_quiz(
        request.topic,
        request.number_of_questions,
        request.difficulty
    )

    return QuizResponse(
        quiz=quiz
    )