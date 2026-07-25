from datetime import datetime, timedelta, timezone

from app.database.connection import quiz_attempts_collection


def get_user_progress(user_email: str):

    attempts = list(
        quiz_attempts_collection.find(
            {"user_email": user_email}
        ).sort("attempted_at", -1)
    )

    # No quizzes attempted yet
    if not attempts:
        return {
            "total_quizzes": 0,
            "total_questions": 0,
            "correct_answers": 0,
            "wrong_answers": 0,
            "average_score": 0.0,
            "best_score": 0.0,
            "current_streak": 0,
            "longest_streak": 0,
            "recent_quizzes": []
        }

    # -------------------------
    # Basic statistics
    # -------------------------

    total_quizzes = len(attempts)

    total_questions = sum(
        attempt["total_questions"]
        for attempt in attempts
    )

    correct_answers = sum(
        attempt["correct_answers"]
        for attempt in attempts
    )

    wrong_answers = sum(
        attempt["wrong_answers"]
        for attempt in attempts
    )

    scores = [
        attempt["score_percentage"]
        for attempt in attempts
    ]

    average_score = round(
        sum(scores) / total_quizzes,
        2
    )

    best_score = max(scores)

    # -------------------------
    # Streak calculation
    # -------------------------

    activity_dates = sorted(
        {
            attempt["attempted_at"].date()
            for attempt in attempts
        }
    )

    longest_streak = 1
    running_streak = 1

    for i in range(1, len(activity_dates)):

        if (
            activity_dates[i]
            == activity_dates[i - 1] + timedelta(days=1)
        ):
            running_streak += 1
            longest_streak = max(
                longest_streak,
                running_streak
            )
        else:
            running_streak = 1

    # -------------------------
    # Current streak
    # -------------------------

    today = datetime.now(timezone.utc).date()
    latest_activity_date = activity_dates[-1]

    # A streak is active only if the learner
    # studied today or yesterday.
    if latest_activity_date not in {
        today,
        today - timedelta(days=1)
    }:
        current_streak = 0

    else:
        current_streak = 1

        for i in range(
            len(activity_dates) - 1,
            0,
            -1
        ):

            if (
                activity_dates[i]
                == activity_dates[i - 1] + timedelta(days=1)
            ):
                current_streak += 1
            else:
                break

    # -------------------------
    # Recent quiz activity
    # -------------------------

    recent_quizzes = []

    for attempt in attempts[:5]:

        recent_quizzes.append(
            {
                "topic": attempt["topic"],
                "difficulty": attempt["difficulty"],
                "score_percentage": attempt["score_percentage"],
                "attempted_at": attempt["attempted_at"].isoformat()
            }
        )

    return {
        "total_quizzes": total_quizzes,
        "total_questions": total_questions,
        "correct_answers": correct_answers,
        "wrong_answers": wrong_answers,
        "average_score": average_score,
        "best_score": best_score,
        "current_streak": current_streak,
        "longest_streak": longest_streak,
        "recent_quizzes": recent_quizzes
    }