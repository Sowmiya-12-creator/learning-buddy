from typing import Literal

from pydantic import BaseModel, Field


ResponseMode = Literal[
    "teaching",
    "follow_up",
    "conversation"
]


class VisualStep(BaseModel):
    step: int
    title: str
    description: str


class AvatarSection(BaseModel):
    speech: str

    gesture: Literal[
        "welcome",
        "explain",
        "point_to_visual",
        "encourage",
        "think",
        "conclude",
        "none"
    ] = "explain"

    pause_after: bool = False


class VisualTeaching(BaseModel):
    visual_type: Literal[
        "diagram",
        "flowchart",
        "mind_map",
        "timeline",
        "table",
        "comparison",
        "step_animation",
        "process",
        "illustration",
        "graph",
        "sequence",
        "other"
    ]

    title: str
    description: str

    steps: list[VisualStep] = Field(
        min_length=1,
        max_length=8
    )


class AIResponse(BaseModel):

    # =========================================================
    # RESPONSE MODE
    # =========================================================

    response_mode: ResponseMode


    # =========================================================
    # WRITTEN RESPONSE
    # =========================================================

    explanation: str | None = None


    # =========================================================
    # TOPIC
    # =========================================================

    topic: str | None = None


    # =========================================================
    # OPTIONAL LEARNING CONTENT
    # =========================================================

    example: str | None = None

    key_points: list[str] = Field(
        default_factory=list,
        max_length=5
    )

    practice_question: str | None = None


    # =========================================================
    # PROGRAMMING / CODE CONTENT
    #
    # Used when the learner asks for:
    #
    # - a program
    # - code
    # - an algorithm implementation
    # - a coding example
    #
    # Example:
    #
    # "Give Java program for palindrome"
    #
    # code -> actual Java source code
    # code_language -> "java"
    # =========================================================

    code: str | None = None

    code_language: str | None = None


    # =========================================================
    # VISUAL LEARNING
    # =========================================================

    visual_steps: list[VisualStep] = Field(
        default_factory=list,
        max_length=8
    )

    visual_teaching: VisualTeaching | None = None


    # =========================================================
    # LISTEN / TTS
    #
    # Educational questions should provide narration.
    #
    # For programming questions, narration should explain
    # what the code does instead of reading every code symbol.
    # =========================================================

    narration: str | None = None


    # =========================================================
    # AVATAR
    #
    # Educational questions should provide avatar guidance.
    #
    # Conversation messages such as "Hi", "Okay" and
    # "Thank you" should normally leave this empty.
    # =========================================================

    avatar_sections: list[AvatarSection] = Field(
        default_factory=list,
        max_length=6
    )