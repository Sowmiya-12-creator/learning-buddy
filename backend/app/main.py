from fastapi import FastAPI
from app.routers.user import router as user_router
from app.routers.ai import router as ai_router

app = FastAPI(title="Learning Buddy Backend")

app.include_router(user_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Learning Buddy Backend 🚀"
    }