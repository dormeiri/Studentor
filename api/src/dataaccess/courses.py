from extensions import mongo
from bson import ObjectId

def get_course(id):
    return mongo.db.courses.find_one({'_id': ObjectId(id)})