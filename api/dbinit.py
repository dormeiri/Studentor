from os import environ
from pymongo import MongoClient, ASCENDING, DESCENDING


def get_connection():
    return MongoClient(environ['STUDENTOR_MONGO_URI'])


def initialize(mongo):
    mongo.db.users.create_index('email', unique=True)

    mongo.db.assignments.create_index([('user_id', ASCENDING)])
    mongo.db.assignments.create_index([('title', ASCENDING)])
    mongo.db.assignments.create_index([('due', DESCENDING)])


if __name__ == "__main__":
    mongo = get_connection()
    initialize(mongo)
