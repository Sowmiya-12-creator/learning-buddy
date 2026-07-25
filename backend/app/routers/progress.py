from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.schemas.progress import ProgressResponse
from app.services.progress_service import get_user_progress


router = APIRouter()


@router.get("/progress", response_model=ProgressResponse)
def get_progress(
    current_user=Depends(get_current_user)
):

    progress = get_user_progress(
        current_user["email"]
    )

    return ProgressResponse(**progress)