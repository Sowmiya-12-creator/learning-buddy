from fastapi import APIRouter, Depends, HTTPException, Query

from app.dependencies.auth import get_current_user
from app.schemas.chat import (
    CreateChatSessionRequest,
    CreateChatSessionResponse,
    ChatHistoryResponse,
    ChatSessionResponse,
    DeleteChatSessionResponse
)
from app.services.chat_service import (
    create_chat_session,
    get_chat_history,
    search_chat_history,
    get_chat_session,
    delete_chat_session
)


router = APIRouter()


@router.post(
    "/chat/sessions",
    response_model=CreateChatSessionResponse
)
def create_session(
    request: CreateChatSessionRequest,
    current_user=Depends(get_current_user)
):

    result = create_chat_session(
        user_email=current_user["email"],
        title=request.title
    )

    return CreateChatSessionResponse(**result)


@router.get(
    "/chat/history",
    response_model=ChatHistoryResponse
)
def chat_history(
    current_user=Depends(get_current_user)
):

    return get_chat_history(
        user_email=current_user["email"]
    )


@router.get(
    "/chat/search",
    response_model=ChatHistoryResponse
)
def search_chats(
    query: str = Query(
        ...,
        min_length=1
    ),
    current_user=Depends(get_current_user)
):

    return search_chat_history(
        user_email=current_user["email"],
        query=query
    )


@router.get(
    "/chat/sessions/{session_id}",
    response_model=ChatSessionResponse
)
def get_session(
    session_id: str,
    current_user=Depends(get_current_user)
):

    session = get_chat_session(
        session_id=session_id,
        user_email=current_user["email"]
    )

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Chat session not found"
        )

    return ChatSessionResponse(**session)


@router.delete(
    "/chat/sessions/{session_id}",
    response_model=DeleteChatSessionResponse
)
def delete_session(
    session_id: str,
    current_user=Depends(get_current_user)
):

    deleted = delete_chat_session(
        session_id=session_id,
        user_email=current_user["email"]
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Chat session not found"
        )

    return DeleteChatSessionResponse(
        message="Chat session deleted successfully!"
    )