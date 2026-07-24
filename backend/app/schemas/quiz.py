from pydantic import BaseModel, Field
from typing import Literal


class QuizRequest(BaseModel):
    topic: str
    number_of_questions: int = Field(ge=1, le=20)
    difficulty: Literal["easy", "medium", "hard", "mixed"]


class QuizQuestion(BaseModel):
    difficulty: str
    question: str
    options: list[str]
    answer: str


class QuizResponse(BaseModel):
    quiz: list[QuizQuestion]