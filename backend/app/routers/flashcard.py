from fastapi import APIRouter, Depends, HTTPException

from app.schemas.flashcard import FlashcardRequest, FlashcardResponse
from app.services.flashcard_service import generate_flashcards
from app.dependencies.auth import get_current_user
from app.database.connection import users_collection


router = APIRouter()


@router.post("/flashcards/generate", response_model=FlashcardResponse)
def create_flashcards(
    request: FlashcardRequest,
    current_user=Depends(get_current_user)
):

    user = users_collection.find_one(
        {"email": current_user["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    flashcards = generate_flashcards(
        topic=request.topic,
        number_of_cards=request.number_of_cards,
        learning_level=user.get("learning_level", "General"),
        preferred_language=user.get("preferred_language", "English")
    )

    if not flashcards:
        raise HTTPException(
            status_code=500,
            detail="Unable to generate flashcards"
        )

    return FlashcardResponse(
        topic=request.topic,
        flashcards=flashcards
    )