from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["learning_buddy"]

# User accounts and learner profiles
users_collection = db["users"]

# Quiz attempt history
quiz_attempts_collection = db["quiz_attempts"]

# Focus timer / study session history
focus_sessions_collection = db["focus_sessions"]

# AI Tutor chat sessions and history
chat_sessions_collection = db["chat_sessions"]