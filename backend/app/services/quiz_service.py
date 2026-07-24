from app.schemas.quiz import QuizQuestion


def generate_quiz(topic: str, number_of_questions: int, difficulty: str):

    quiz = []

    if difficulty == "mixed":

        quiz.extend([
            QuizQuestion(
                difficulty="Easy",
                question=f"What is {topic}?",
                options=[
                    "Algorithm",
                    "Programming Language",
                    "Database",
                    "Operating System"
                ],
                answer="Algorithm"
            ),

            QuizQuestion(
                difficulty="Easy",
                question=f"Why do we use {topic}?",
                options=[
                    "To solve problems",
                    "To cook food",
                    "To draw pictures",
                    "To edit videos"
                ],
                answer="To solve problems"
            ),

            QuizQuestion(
                difficulty="Medium",
                question=f"What is the time complexity of {topic}?",
                options=[
                    "O(n)",
                    "O(log n)",
                    "O(n²)",
                    "O(1)"
                ],
                answer="O(log n)"
            ),

            QuizQuestion(
                difficulty="Medium",
                question=f"When should {topic} be used?",
                options=[
                    "When data is sorted",
                    "For images",
                    "For music",
                    "For networking"
                ],
                answer="When data is sorted"
            ),

            QuizQuestion(
                difficulty="Hard",
                question=f"What is the limitation of {topic}?",
                options=[
                    "Requires sorted data",
                    "Uses no memory",
                    "Works only on strings",
                    "Cannot search"
                ],
                answer="Requires sorted data"
            ),

            QuizQuestion(
                difficulty="Hard",
                question=f"Which scenario best suits {topic}?",
                options=[
                    "Searching sorted data",
                    "Playing games",
                    "Editing videos",
                    "Drawing images"
                ],
                answer="Searching sorted data"
            )
        ])

    return quiz[:number_of_questions]