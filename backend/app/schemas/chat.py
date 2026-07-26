from pydantic import BaseModel, Field
from typing import Literal


class CreateChatSessionRequest(BaseModel):
    title: str | None = None


class CreateChatSessionResponse(BaseModel):
    session_id: str
    title: str
    message: str


class ChatVisualStep(BaseModel):
    step: int
    title: str
    description: str


class ChatMessage(BaseModel):
    message_id: str

    sender: Literal[
        "user",
        "ai"
    ]

    text: str

    topic: str | None = None

    visual_steps: list[ChatVisualStep] = Field(
        default_factory=list
    )

    narration: str | None = None

    timestamp: str


class ChatSessionSummary(BaseModel):
    session_id: str
    title: str
    started_at: str
    updated_at: str


class ChatHistoryResponse(BaseModel):
    sessions: list[ChatSessionSummary]


class ChatSessionResponse(BaseModel):
    session_id: str
    title: str
    started_at: str
    updated_at: str
    messages: list[ChatMessage]


class DeleteChatSessionResponse(BaseModel):
    message: str