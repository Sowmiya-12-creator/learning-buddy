from fastapi import APIRouter, Depends

from app.schemas.quiz import QuizRequest, QuizResponse
from app.schemas.quiz_submission import (
    QuizSubmitRequest,
    QuizSubmitResponse
)
from app.services.quiz_service import generate_quiz
from app.services.quiz_submission_service import evaluate_quiz
from app.dependencies.auth import get_current_user
from app.database.connection import users_collection


router = APIRouter()


@router.post("/quiz/generate", response_model=QuizResponse)
def create_quiz(
    request: QuizRequest,
    current_user=Depends(get_current_user)
):

    user = users_collection.find_one(
        {"email": current_user["email"]}
    )

    quiz = generate_quiz(
        topic=request.topic,
        number_of_questions=request.number_of_questions,
        difficulty=request.difficulty,
        learning_level=user.get("learning_level", "General"),
        preferred_language=user.get("preferred_language", "English")
    )

    return QuizResponse(
        quiz=quiz
    )


@router.post("/quiz/submit", response_model=QuizSubmitResponse)
def submit_quiz(
    submission: QuizSubmitRequest,
    current_user=Depends(get_current_user)
):

    result = evaluate_quiz(
        submission=submission,
        user_email=current_user["email"]
    )

    return QuizSubmitResponse(
        total_questions=result["total_questions"],
        correct_answers=result["correct_answers"],
        wrong_answers=result["wrong_answers"],
        score_percentage=result["score_percentage"],
        message=result["message"]
    )