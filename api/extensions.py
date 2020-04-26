import json
import datetime
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from bson.objectid import ObjectId


mongo = PyMongo()
jwt = JWTManager()


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)
