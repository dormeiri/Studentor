from services.auth import get_authenticated_user
from models.course import course_schema
from models.assignment import assignment_schema


class DataSet:
    def __init__(self, schema, owner=None):
        self.schema = schema
        self.owner = owner

    def context(self, owner=None):
        if not owner:
            owner = get_authenticated_user().id

        return DataSet(self.schema, owner)

    def create(self, document):
        if document.id:
            return None

        return document.save()

    def update(self, id, payload):
        document = self.get(id)

        if not document:
            return None

        for key, value in payload.items():
            if key not in ('_id', self.schema.owner_key):
                document[key] = value

        return document.save()

    def delete(self, id):
        document = self.get(id)

        if document:
            document.delete()

        return bool(document)

    def get(self, id=None):
        if id is not None:
            return self.exposed().filter(id=id).first()
        else:
            return self.exposed()

    def exposed(self):
        return self.schema.model.objects(**{self.schema.owner_key: self.owner})


courses = DataSet(course_schema)
assignments = DataSet(assignment_schema)
