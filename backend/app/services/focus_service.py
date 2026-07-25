from datetime import datetime, timezone

from app.database.connection import focus_sessions_collection


def save_focus_session(
    user_email: str,
    duration_minutes: int,
    subject: str | None = None,
    topic: str | None = None
):

    completed_at = datetime.now(timezone.utc)

    session = {
        "user_email": user_email,
        "duration_minutes": duration_minutes,
        "subject": subject,
        "topic": topic,
        "completed_at": completed_at
    }

    focus_sessions_collection.insert_one(session)

    return {
        "message": "Focus session saved successfully!",
        "duration_minutes": duration_minutes
    }


def get_focus_stats(user_email: str):

    sessions = list(
        focus_sessions_collection.find(
            {"user_email": user_email}
        ).sort("completed_at", -1)
    )

    # No focus sessions yet
    if not sessions:
        return {
            "total_sessions": 0,
            "total_study_minutes": 0,
            "today_study_minutes": 0,
            "recent_sessions": []
        }

    # -------------------------
    # Total statistics
    # -------------------------

    total_sessions = len(sessions)

    total_study_minutes = sum(
        session["duration_minutes"]
        for session in sessions
    )

    # -------------------------
    # Today's study time
    # -------------------------

    today = datetime.now(timezone.utc).date()

    today_study_minutes = sum(
        session["duration_minutes"]
        for session in sessions
        if session["completed_at"].date() == today
    )

    # -------------------------
    # Recent sessions
    # -------------------------

    recent_sessions = []

    for session in sessions[:5]:

        recent_sessions.append(
            {
                "duration_minutes": session["duration_minutes"],
                "subject": session.get("subject"),
                "topic": session.get("topic"),
                "completed_at": session["completed_at"].isoformat()
            }
        )

    return {
        "total_sessions": total_sessions,
        "total_study_minutes": total_study_minutes,
        "today_study_minutes": today_study_minutes,
        "recent_sessions": recent_sessions
    }