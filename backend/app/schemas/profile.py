from pydantic import BaseModel
from typing import Literal


class UpdateProfileRequest(BaseModel):
    name: str

    learning_level: Literal[
        "LKG",
        "UKG",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
        "Class 5",
        "Class 6",
        "Class 7",
        "Class 8",
        "Class 9",
        "Class 10",
        "Class 11",
        "Class 12",
    ]

    preferred_language: Literal[
        "English",
        "Tamil",
    ]

    learning_goal: Literal[
        "Understand Concepts",
        "Complete Homework",
        "Prepare for Exams",
        "Practice Questions",
        "Improve Grades",
        "Daily Learning",
    ]