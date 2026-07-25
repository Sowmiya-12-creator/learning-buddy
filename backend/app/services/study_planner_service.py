import os

from dotenv import load_dotenv
from google import genai
from google.genai import types

from app.schemas.study_planner import StudyPlannerResponse


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_study_plan(
    subjects: list[str],
    number_of_days: int,
    learning_level: str,
    learning_goal: str,
    preferred_language: str,
    daily_study_time: int
):

    subjects_text = ", ".join(subjects)

    prompt = f"""
You are the Study Planner AI for Learning Buddy.

Create a realistic and personalized study plan for the learner.

LEARNER PROFILE:

Learning Level: {learning_level}
Learning Goal: {learning_goal}
Preferred Language: {preferred_language}
Available Study Time Per Day: {daily_study_time} minutes

PLAN REQUEST:

Subjects: {subjects_text}
Number of Days: {number_of_days}

IMPORTANT RULES:

1. Generate exactly {number_of_days} days.

2. Use only the subjects provided by the learner.

3. Every day must contain useful study tasks.

4. The total duration of all tasks for one day should be
   approximately {daily_study_time} minutes.

5. Never create an unrealistic schedule that greatly exceeds
   the learner's available daily study time.

6. Adapt topics and activities to the learner's level:
   {learning_level}.

7. Adapt the plan toward the learner's goal:
   {learning_goal}.

8. Use {preferred_language} for the plan content.

9. Distribute subjects sensibly across the requested days.

10. Avoid repeating exactly the same topic unnecessarily.

11. Each task must contain:
    - subject
    - topic
    - duration_minutes
    - activity

12. Activities can include:
    - Learn concept
    - Revision
    - Practice problems
    - Coding practice
    - Quiz
    - Flashcard review
    - Mock interview
    - Notes/revision

13. For exam preparation, prioritize revision and questions.

14. For interview preparation, prioritize important concepts,
    coding/problem solving, and interview-style revision.

15. For learning new skills, progress from fundamentals toward
    more advanced concepts.

Create a short and meaningful plan title.
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=StudyPlannerResponse
        )
    )

    result = StudyPlannerResponse.model_validate_json(
        response.text
    )

    return result