from fastapi import APIRouter, Depends, HTTPException

from app.schemas.study_planner import (
    StudyPlannerRequest,
    StudyPlannerResponse
)
from app.services.study_planner_service import generate_study_plan
from app.dependencies.auth import get_current_user
from app.database.connection import users_collection


router = APIRouter()


@router.post(
    "/study-planner/generate",
    response_model=StudyPlannerResponse
)
def create_study_plan(
    request: StudyPlannerRequest,
    current_user=Depends(get_current_user)
):

    user = users_collection.find_one(
        {"email": current_user["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not user.get("onboarding_completed", False):
        raise HTTPException(
            status_code=400,
            detail="Complete onboarding before generating a study plan"
        )

    try:
        plan = generate_study_plan(
            subjects=request.subjects,
            number_of_days=request.number_of_days,
            learning_level=user.get(
                "learning_level",
                "General"
            ),
            learning_goal=user.get(
                "learning_goal",
                "Improve Knowledge"
            ),
            preferred_language=user.get(
                "preferred_language",
                "English"
            ),
            daily_study_time=user.get(
                "daily_study_time",
                30
            )
        )

        return plan

    except Exception as e:
        print(f"Study planner generation error: {e}")

        raise HTTPException(
            status_code=500,
            detail="Unable to generate study plan"
        )