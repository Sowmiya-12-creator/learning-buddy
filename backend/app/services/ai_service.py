import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_ai_response(question: str) -> str:
    try:

        prompt = f"""
You are Learning Buddy, an AI tutor for engineering students.

Your job is to teach concepts in a simple and beginner-friendly way.

For every question, answer in this format:

📖 Topic:
(Name of the topic)

🧠 Explanation:
(Explain in very simple words)

💻 Example:
(Give one practical example)

⭐ Key Points:
- Point 1
- Point 2
- Point 3

📝 Practice Question:
(Ask one easy practice question)

Student Question:
{question}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        return f"Error: {str(e)}"