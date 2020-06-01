from os import environ
from pymongo import MongoClient, ASCENDING, DESCENDING


def get_connection():
    return MongoClient(environ['STUDENTOR_MONGO_URI'])


def update_index():
    mongo = get_connection()
    mongo.studentor.users.create_index('email', unique=True)

    mongo.studentor.assignments.create_index([('user_id', ASCENDING)])
    mongo.studentor.assignments.create_index([('title', ASCENDING)])
    mongo.studentor.assignments.create_index([('due', DESCENDING)])

    mongo.studentor.courses.create_index([('user_id', ASCENDING)])
    mongo.studentor.courses.create_index([('name', ASCENDING)])


if __name__ == "__main__":
    update_index()
