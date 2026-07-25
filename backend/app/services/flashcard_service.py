import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.flashcard import FlashcardResponse


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_flashcards(
    topic: str,
    number_of_cards: int,
    learning_level: str,
    preferred_language: str
):

    prompt = f"""
You are the flashcard generator for Learning Buddy,
an educational platform for learners of different ages.

LEARNER PROFILE:
Learning Level: {learning_level}
Preferred Language: {preferred_language}

FLASHCARD REQUIREMENTS:
Topic: {topic}
Number of Flashcards: {number_of_cards}

IMPORTANT RULES:

1. Generate exactly {number_of_cards} flashcards.

2. Every flashcard must be directly related to "{topic}".

3. Use {preferred_language} as the primary language.

4. Adapt the difficulty and wording to the learner's
   learning level: {learning_level}.

5. Each flashcard must contain:
   - front: a short question, term, or prompt
   - back: the correct explanation or answer

6. Do not repeat the same concept in multiple cards.

7. Keep the back concise enough for flashcard revision.

8. For LKG/UKG learners:
   - Use extremely simple words.
   - Keep questions and answers very short.
   - Use familiar everyday examples.

9. For school students:
   - Use age-appropriate academic concepts.

10. For college students:
    - Include important definitions, concepts,
      applications, and technical terminology when appropriate.

11. For professionals/adults:
    - Prefer practical and application-oriented concepts.

12. Do not include markdown formatting inside the flashcards.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=FlashcardResponse
            )
        )

        result = FlashcardResponse.model_validate_json(
            response.text
        )

        return result.flashcards

    except Exception as e:

        print(f"Flashcard generation error: {e}")

        return []