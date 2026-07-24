from fastapi import APIRouter, Depends

from app.schemas.onboarding import (
    OnboardingRequest,
    OnboardingResponse
)
from app.services.onboarding_service import save_onboarding
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.post("/onboarding", response_model=OnboardingResponse)
def onboarding(
    request: OnboardingRequest,
    current_user=Depends(get_current_user)
):

    result = save_onboarding(
        request,
        current_user["email"]
    )

    return OnboardingResponse(
        message=result["message"]
    )