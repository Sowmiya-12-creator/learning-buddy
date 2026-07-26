from datetime import datetime, timezone
from uuid import uuid4
import re

from app.database.connection import chat_sessions_collection


def create_chat_session(
    user_email: str,
    title: str | None = None
):

    now = datetime.now(timezone.utc)

    session_id = str(uuid4())

    session_title = (
        title.strip()
        if title and title.strip()
        else "New Chat"
    )

    session = {
        "session_id": session_id,
        "user_email": user_email,
        "title": session_title,
        "started_at": now,
        "updated_at": now,
        "messages": []
    }

    chat_sessions_collection.insert_one(session)

    return {
        "session_id": session_id,
        "title": session_title,
        "message": "Chat session created successfully!"
    }


def add_chat_message(
    session_id: str,
    user_email: str,
    sender: str,
    text: str,
    topic: str | None = None,
    visual_steps: list | None = None,
    narration: str | None = None,
    avatar_sections: list | None = None,
    visual_teaching: dict | None = None
):

    session = chat_sessions_collection.find_one(
        {
            "session_id": session_id,
            "user_email": user_email
        }
    )

    if not session:
        return None

    now = datetime.now(timezone.utc)

    message = {
        "message_id": str(uuid4()),
        "sender": sender,
        "text": text,
        "topic": topic,
        "visual_steps": visual_steps or [],
        "narration": narration,
        "avatar_sections": avatar_sections or [],
        "visual_teaching": visual_teaching,
        "timestamp": now
    }

    chat_sessions_collection.update_one(
        {
            "session_id": session_id,
            "user_email": user_email
        },
        {
            "$push": {
                "messages": message
            },
            "$set": {
                "updated_at": now
            }
        }
    )

    return message


def get_chat_history(user_email: str):

    sessions = chat_sessions_collection.find(
        {"user_email": user_email}
    ).sort("updated_at", -1)

    history = []

    for session in sessions:

        history.append(
            {
                "session_id": session["session_id"],
                "title": session["title"],
                "started_at": session["started_at"].isoformat(),
                "updated_at": session["updated_at"].isoformat()
            }
        )

    return {
        "sessions": history
    }


def search_chat_history(
    user_email: str,
    query: str
):

    search_query = query.strip()

    if not search_query:
        return {
            "sessions": []
        }

    escaped_query = re.escape(search_query)

    sessions = chat_sessions_collection.find(
        {
            "user_email": user_email,
            "title": {
                "$regex": escaped_query,
                "$options": "i"
            }
        }
    ).sort("updated_at", -1)

    results = []

    for session in sessions:

        results.append(
            {
                "session_id": session["session_id"],
                "title": session["title"],
                "started_at": session["started_at"].isoformat(),
                "updated_at": session["updated_at"].isoformat()
            }
        )

    return {
        "sessions": results
    }


def get_chat_session(
    session_id: str,
    user_email: str
):

    session = chat_sessions_collection.find_one(
        {
            "session_id": session_id,
            "user_email": user_email
        }
    )

    if not session:
        return None

    messages = []

    for message in session.get("messages", []):

        messages.append(
            {
                "message_id": message["message_id"],
                "sender": message["sender"],
                "text": message["text"],
                "topic": message.get("topic"),
                "visual_steps": message.get(
                    "visual_steps",
                    []
                ),
                "narration": message.get("narration"),
                "avatar_sections": message.get(
                    "avatar_sections",
                    []
                ),
                "visual_teaching": message.get(
                    "visual_teaching"
                ),
                "timestamp": message[
                    "timestamp"
                ].isoformat()
            }
        )

    return {
        "session_id": session["session_id"],
        "title": session["title"],
        "started_at": session[
            "started_at"
        ].isoformat(),
        "updated_at": session[
            "updated_at"
        ].isoformat(),
        "messages": messages
    }


def delete_chat_session(
    session_id: str,
    user_email: str
):

    result = chat_sessions_collection.delete_one(
        {
            "session_id": session_id,
            "user_email": user_email
        }
    )

    return result.deleted_count > 0


def update_chat_title(
    session_id: str,
    user_email: str,
    title: str
):

    result = chat_sessions_collection.update_one(
        {
            "session_id": session_id,
            "user_email": user_email,
            "title": "New Chat"
        },
        {
            "$set": {
                "title": title
            }
        }
    )

    return result.modified_count > 0