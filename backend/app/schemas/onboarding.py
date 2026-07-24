from pydantic import BaseModel
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

    daily_study_time: int


class OnboardingResponse(BaseModel):
    message: str