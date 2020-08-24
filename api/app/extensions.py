import json
import datetime
from dataaccess.context import Context
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from bson.objectid import ObjectId


mongo = PyMongo()
context = Context()
jwt = JWTManager()


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)
