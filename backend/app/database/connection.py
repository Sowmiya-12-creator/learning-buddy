from pymongo import MongoClient


MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["learning_buddy"]


# User accounts + learner profile
users_collection = db["users"]


# Quiz history and results
quiz_attempts_collection = db["quiz_attempts"]