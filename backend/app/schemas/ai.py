from pydantic import BaseModel


class AIQuestionRequest(BaseModel):
    question: str