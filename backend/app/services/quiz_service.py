import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.quiz import QuizResponse


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_quiz(
    topic: str,
    number_of_questions: int,
    difficulty: str,
    learning_level: str,
    preferred_language: str
):

    if difficulty == "mixed":
        difficulty_instruction = """
Create a balanced mixture of Easy, Medium, and Hard questions.

If 6 questions are requested:
- 2 Easy
- 2 Medium
- 2 Hard

For other question counts, distribute the questions as evenly as possible
between Easy, Medium, and Hard.
"""
    else:
        difficulty_instruction = f"""
All questions must have {difficulty} difficulty.
"""

    prompt = f"""
You are the quiz generator for Learning Buddy,
an educational platform for learners of all ages.

LEARNER PROFILE:
Learning Level: {learning_level}
Preferred Language: {preferred_language}

QUIZ REQUIREMENTS:
Topic: {topic}
Number of Questions: {number_of_questions}
Requested Difficulty: {difficulty}

{difficulty_instruction}

IMPORTANT RULES:

1. Generate exactly {number_of_questions} questions.

2. Questions must be appropriate for the learner's learning level.

3. Use {preferred_language} as the primary language.

4. Every question must contain exactly 4 options.

5. Only one option must be correct.

6. The answer must exactly match one of the four options.

7. Questions must genuinely test the topic "{topic}".

8. Do not create unrelated questions.

9. For young learners such as LKG or UKG:
   - Use extremely simple words.
   - Use familiar examples.
   - Avoid advanced terminology.
   - Keep questions short.

10. For school students:
    - Use age-appropriate academic questions.

11. For college students:
    - Use conceptual and application-oriented questions.

12. For adults or professionals:
    - Prefer practical and real-world questions.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=QuizResponse
            )
        )

        result = QuizResponse.model_validate_json(
            response.text
        )

        return result.quiz

    except Exception as e:
        print(f"Quiz generation error: {e}")
        return []