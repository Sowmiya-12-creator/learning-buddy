from pydantic import BaseModel, Field
from typing import Literal


class OnboardingRequest(BaseModel):
    learning_level: Literal[
        "LKG",
        "Primary",
        "Middle School",
        "High School",
        "College",
        "Professional",
        "Lifelong Learner"
    ]

    preferred_language: Literal[
        "English",
        "Tamil"
    ]

    learning_goal: Literal[
        "Learn New Skills",
        "Prepare for Exams",
        "Interview Preparation",
        "Improve Knowledge",
        "Learn as a Hobby"
    ]

    daily_study_time: int = Field(
        ge=10,
        le=480
    )


class OnboardingResponse(BaseModel):
    message: str