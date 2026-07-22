from fastapi import FastAPI
from app.routers.user import router as user_router

app = FastAPI(title="Learning Buddy Backend")

app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Learning Buddy Backend 🚀"
    }