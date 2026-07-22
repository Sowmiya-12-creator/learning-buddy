from fastapi import APIRouter, Depends
from app.schemas.user import UserRegister
from app.schemas.auth import LoginRequest
from app.schemas.profile import UpdateProfileRequest
from app.database.connection import users_collection
from app.security.password import hash_password, verify_password
from app.security.jwt_handler import create_access_token
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.post("/users/register")
def register_user(user: UserRegister):

    existing_user = users_collection.find_one({"email": user.email})

    if existing_user:
        return {"message": "Email already registered"}

    user_data = user.model_dump()
    user_data["password"] = hash_password(user_data["password"])

    result = users_collection.insert_one(user_data)

    return {
        "message": "User registered successfully",
        "id": str(result.inserted_id)
    }


@router.post("/users/login")
def login_user(user: LoginRequest):

    existing_user = users_collection.find_one({"email": user.email})

    if not existing_user:
        return {"message": "User Not Found"}

    if not verify_password(user.password, existing_user["password"]):
        return {"message": "Invalid Password"}

    token = create_access_token(
        {"email": existing_user["email"]}
    )

    return {
        "message": "Login Successful",
        "access_token": token
    }


@router.get("/users/me")
def get_logged_in_user(current_user=Depends(get_current_user)):
    return {
        "message": "Authentication Working",
        "user": current_user
    }


@router.put("/users/profile")
def update_profile(
    profile: UpdateProfileRequest,
    current_user=Depends(get_current_user)
):

    users_collection.update_one(
        {"email": current_user["email"]},
        {
            "$set": {
                "name": profile.name
            }
        }
    )

    return {
        "message": "Profile Updated Successfully"
    }


@router.get("/users/profile")
def get_profile(current_user=Depends(get_current_user)):

    user = users_collection.find_one(
        {"email": current_user["email"]}
    )

    return {
        "name": user["name"],
        "email": user["email"]
    }