from pydantic import BaseModel


class RecentQuiz(BaseModel):
    topic: str
    difficulty: str
    score_percentage: float
    attempted_at: str


class ProgressResponse(BaseModel):
    total_quizzes: int
    total_questions: int
    correct_answers: int
    wrong_answers: int

    average_score: float
    best_score: float

    current_streak: int
    longest_streak: int

    recent_quizzes: list[RecentQuiz]