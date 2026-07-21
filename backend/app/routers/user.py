from fastapi import APIRouter
from app.schemas.user import UserRegister
from app.database.connection import users_collection

router = APIRouter()


@router.post("/users/register")
def register_user(user: UserRegister):

    # Check if email already exists
    existing_user = users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return {
            "message": "Email already registered"
        }

    user_data = user.model_dump()

    result = users_collection.insert_one(user_data)

    return {
        "message": "User registered successfully",
        "id": str(result.inserted_id)
    }