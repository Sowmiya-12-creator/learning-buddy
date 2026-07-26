from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse

from app.dependencies.auth import get_current_user
from app.schemas.tts import TTSRequest
from app.services.tts_service import generate_speech


router = APIRouter()


@router.post("/tts/generate")
def generate_tts(
    request: TTSRequest,
    current_user=Depends(get_current_user)
):

    try:

        result = generate_speech(
            narration=request.narration
        )

        return FileResponse(
            path=result["file_path"],
            media_type="audio/wav",
            filename=result["filename"]
        )

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="Unable to generate speech"
        )