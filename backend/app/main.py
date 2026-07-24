from fastapi import FastAPI
from app.routers.user import router as user_router
from app.routers.ai import router as ai_router
from app.routers.quiz import router as quiz_router
from app.routers.onboarding import router as onboarding_router

app = FastAPI(title="Learning Buddy Backend")

app.include_router(user_router)
app.include_router(ai_router)
app.include_router(quiz_router)
app.include_router(onboarding_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Learning Buddy Backend 🚀"
    }