from pydantic import BaseModel


class TTSRequest(BaseModel):
    narration: str