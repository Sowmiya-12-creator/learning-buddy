from pydantic import BaseModel, Field


class VisualStep(BaseModel):
    step: int
    title: str
    description: str


class AIResponse(BaseModel):
    topic: str
    explanation: str
    example: str

    key_points: list[str] = Field(
        min_length=1,
        max_length=5
    )

    practice_question: str

    visual_steps: list[VisualStep] = Field(
        min_length=1,
        max_length=8
    )

    narration: str