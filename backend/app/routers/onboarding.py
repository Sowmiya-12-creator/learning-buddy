from fastapi import APIRouter
from app.schemas.onboarding import (
    OnboardingRequest,
    OnboardingResponse
)
from app.services.onboarding_service import save_onboarding

router = APIRouter()


@router.post("/onboarding", response_model=OnboardingResponse)
def onboarding(request: OnboardingRequest):

    result = save_onboarding(request)

    return OnboardingResponse(
        message=result["message"]
    )