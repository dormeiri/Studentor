from mongoengine import QuerySet


class Field:
    def __init__(self, load_only=False):
        self.load_only = load_only


class ModelSchema:
    def __init__(self, owner_key='owner'):
        self.fields = {
            key: value
            for key, value
            in vars(type(self)).items()
            if isinstance(value, Field)
        }
        self.owner_key = owner_key

    def load(self, json):
        return self.model(**json)

    def dump(self, data):
        if isinstance(data, QuerySet):
            return [self.dump(doc) for doc in data]

        data = data.to_mongo()

        return {
            key: value
            for key, value
            in data.items()
            if not self.fields.get(key, Field()).load_only
        }
