from models.base import ModelSchema
from models.user import User
from mongoengine import (
    StringField, ReferenceField, Document, CASCADE
)


# Model

class Course(Document):
    name = StringField(max_length=200, required=True, null=False)
    info = StringField(required=False)
    owner = ReferenceField(User, reverse_delete_rule=CASCADE)


# Schemas

class CourseSchema(ModelSchema):
    model = Course


course_schema = CourseSchema()
