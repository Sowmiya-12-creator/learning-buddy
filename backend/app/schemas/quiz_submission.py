from pydantic import BaseModel, Field
from typing import Literal


class QuizAnswer(BaseModel):
    question: str
    selected_answer: str
    correct_answer: str


class QuizSubmitRequest(BaseModel):
    topic: str
    difficulty: Literal["easy", "medium", "hard", "mixed"]
    answers: list[QuizAnswer] = Field(min_length=1)


class QuizSubmitResponse(BaseModel):
    total_questions: int
    correct_answers: int
    wrong_answers: int
    score_percentage: float
    message: str