from typing import Literal

from pydantic import BaseModel, Field


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
    topic: str

    explanation: str

    example: str

    key_points: list[str] = Field(
        min_length=1,
        max_length=5
    )

    practice_question: str

    # Existing visual steps are preserved
    # so current chat storage continues to work.
    visual_steps: list[VisualStep] = Field(
        min_length=1,
        max_length=8
    )

    # Full narration used by the existing
    # Listen / TTS feature.
    narration: str

    # Short virtual-teacher guidance.
    # The avatar must not repeat the full explanation.
    avatar_sections: list[AvatarSection] = Field(
        min_length=1,
        max_length=6
    )

    # Structured visual lesson chosen according
    # to the topic and learner.
    visual_teaching: VisualTeaching