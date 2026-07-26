from pydantic import BaseModel


class AIQuestionRequest(BaseModel):
    question: str
    session_id: str | None = None