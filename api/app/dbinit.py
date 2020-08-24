from os import environ
from pymongo import MongoClient, ASCENDING, DESCENDING


def get_connection():
    return MongoClient(environ['MONGO_HOST'], 27017)


def update_index():
    mongo = get_connection()
    mongo.studentor.users.create_index('email', unique=True)

    mongo.studentor.assignments.create_index([('user_id', ASCENDING)])
    mongo.studentor.assignments.create_index([('title', ASCENDING)])
    mongo.studentor.assignments.create_index([('due', DESCENDING)])

    mongo.studentor.courses.create_index([('name', ASCENDING)])

    mongo.studentor.exams.create_index([('course_id', ASCENDING)])
    mongo.studentor.exams.create_index([('date', DESCENDING)])


if __name__ == "__main__":
    update_index()
