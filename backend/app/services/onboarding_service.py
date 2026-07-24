from app.schemas.onboarding import OnboardingRequest
from app.database.connection import users_collection


def save_onboarding(data: OnboardingRequest, email: str):

    result = users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "learning_level": data.learning_level,
                "preferred_language": data.preferred_language,
                "learning_goal": data.learning_goal,
                "daily_study_time": data.daily_study_time,
                "onboarding_completed": True
            }
        }
    )

    if result.matched_count == 0:
        return {
            "success": False,
            "message": "User not found"
        }

    return {
        "success": True,
        "message": "Onboarding completed successfully!"
    }