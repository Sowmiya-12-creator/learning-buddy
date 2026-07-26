import os
import wave
from uuid import uuid4

from dotenv import load_dotenv
from google import genai
from google.genai import types


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


AUDIO_DIRECTORY = "generated_audio"


def save_wave_file(
    filename: str,
    pcm_data: bytes,
    channels: int = 1,
    rate: int = 24000,
    sample_width: int = 2
):

    os.makedirs(
        AUDIO_DIRECTORY,
        exist_ok=True
    )

    file_path = os.path.join(
        AUDIO_DIRECTORY,
        filename
    )

    with wave.open(file_path, "wb") as wav_file:

        wav_file.setnchannels(channels)
        wav_file.setsampwidth(sample_width)
        wav_file.setframerate(rate)
        wav_file.writeframes(pcm_data)

    return file_path


def generate_speech(
    narration: str
):

    if not narration or not narration.strip():
        raise ValueError(
            "Narration cannot be empty"
        )

    prompt = f"""
Read the following educational explanation clearly.

Use a friendly, calm and encouraging tutor voice.
Speak naturally and at a moderate learning pace.
Do not add or remove information.

{narration}
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.1-flash-tts-preview",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=(
                            types.PrebuiltVoiceConfig(
                                voice_name="Kore"
                            )
                        )
                    )
                )
            )
        )

        audio_data = (
            response.candidates[0]
            .content.parts[0]
            .inline_data.data
        )

        filename = (
            f"{uuid4()}.wav"
        )

        file_path = save_wave_file(
            filename=filename,
            pcm_data=audio_data
        )

        return {
            "filename": filename,
            "file_path": file_path
        }

    except Exception as e:

        print(
            f"TTS generation error: {e}"
        )

        raise