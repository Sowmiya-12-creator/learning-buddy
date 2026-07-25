from pydantic import BaseModel, Field
from typing import Optional


class FocusSessionRequest(BaseModel):
    duration_minutes: int = Field(ge=1, le=480)
    subject: Optional[str] = None
    topic: Optional[str] = None


class FocusSessionResponse(BaseModel):
    message: str
    duration_minutes: int


class RecentFocusSession(BaseModel):
    duration_minutes: int
    subject: Optional[str] = None
    topic: Optional[str] = None
    completed_at: str


class FocusStatsResponse(BaseModel):
    total_sessions: int
    total_study_minutes: int
    today_study_minutes: int
    recent_sessions: list[RecentFocusSession]