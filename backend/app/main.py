from fastapi import FastAPI

from app.routers.user import router as user_router
from app.routers.ai import router as ai_router
from app.routers.quiz import router as quiz_router
from app.routers.onboarding import router as onboarding_router
from app.routers.progress import router as progress_router
from app.routers.flashcard import router as flashcard_router
from app.routers.study_planner import router as study_planner_router
from app.routers.focus import router as focus_router
from app.routers.chat import router as chat_router


app = FastAPI(title="Learning Buddy Backend")


app.include_router(user_router)
app.include_router(ai_router)
app.include_router(quiz_router)
app.include_router(onboarding_router)
app.include_router(progress_router)
app.include_router(flashcard_router)
app.include_router(study_planner_router)
app.include_router(focus_router)
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Learning Buddy Backend 🚀"
    }