from pydantic import BaseModel, Field


class FlashcardRequest(BaseModel):
    topic: str = Field(min_length=1)
    number_of_cards: int = Field(ge=1, le=20)


class Flashcard(BaseModel):
    front: str
    back: str


class FlashcardResponse(BaseModel):
    topic: str
    flashcards: list[Flashcard]