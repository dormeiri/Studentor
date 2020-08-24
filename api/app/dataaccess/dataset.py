from bson import ObjectId


class DataSet:
    def __init__(self, collection):
        self.collection = collection

    def where(self, params):
        return self.collection.find(params)

    def find(self, id):
        return self.collection.find_one({'_id': ObjectId(id)})

    def create(self, data):
        return self.collection.insert_one(data)

    def update(self, id, data):
        return self.collection.update_one(
            {'_id': ObjectId(id)}, {'$set': data})

    def delete(self, id):
        return self.collection.delete_one({'_id': ObjectId(id)})
