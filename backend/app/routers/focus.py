from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.schemas.focus import (
    FocusSessionRequest,
    FocusSessionResponse,
    FocusStatsResponse
)
from app.services.focus_service import (
    save_focus_session,
    get_focus_stats
)


router = APIRouter()


@router.post(
    "/focus/sessions",
    response_model=FocusSessionResponse
)
def create_focus_session(
    request: FocusSessionRequest,
    current_user=Depends(get_current_user)
):

    result = save_focus_session(
        user_email=current_user["email"],
        duration_minutes=request.duration_minutes,
        subject=request.subject,
        topic=request.topic
    )

    return FocusSessionResponse(**result)


@router.get(
    "/focus/stats",
    response_model=FocusStatsResponse
)
def focus_stats(
    current_user=Depends(get_current_user)
):

    stats = get_focus_stats(
        user_email=current_user["email"]
    )

    return FocusStatsResponse(**stats)