from datetime import datetime, timezone

from app.schemas.quiz_submission import QuizSubmitRequest
from app.database.connection import quiz_attempts_collection


def evaluate_quiz(
    submission: QuizSubmitRequest,
    user_email: str
):

    total_questions = len(submission.answers)

    correct_answers = 0

    for answer in submission.answers:
        if (
            answer.selected_answer.strip().lower()
            == answer.correct_answer.strip().lower()
        ):
            correct_answers += 1

    wrong_answers = total_questions - correct_answers

    score_percentage = round(
        (correct_answers / total_questions) * 100,
        2
    )

    quiz_attempt = {
        "user_email": user_email,
        "topic": submission.topic,
        "difficulty": submission.difficulty,
        "total_questions": total_questions,
        "correct_answers": correct_answers,
        "wrong_answers": wrong_answers,
        "score_percentage": score_percentage,
        "attempted_at": datetime.now(timezone.utc)
    }

    quiz_attempts_collection.insert_one(
        quiz_attempt
    )

    if score_percentage >= 80:
        message = "Excellent work! Keep it up! 🌟"
    elif score_percentage >= 60:
        message = "Good job! Keep practicing! 👍"
    elif score_percentage >= 40:
        message = "Nice try! A little more practice will help. 💪"
    else:
        message = "Keep learning and try again! 📚"

    return {
        "total_questions": total_questions,
        "correct_answers": correct_answers,
        "wrong_answers": wrong_answers,
        "score_percentage": score_percentage,
        "message": message
    }