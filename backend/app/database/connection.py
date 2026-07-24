from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["learning_buddy"]

users_collection = db["users"]

learner_profiles_collection = db["learner_profiles"]