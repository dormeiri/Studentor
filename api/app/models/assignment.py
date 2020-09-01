from models.base import ModelSchema
from models.course import Course
from models.user import User
from mongoengine import (
    DateField, StringField, IntField,
    ReferenceField, Document, BooleanField, CASCADE
)


# Model

class Assignment(Document):
    title = StringField(max_length=50)
    date = DateField()
    grade = IntField(min_value=0, max_value=100)
    course = ReferenceField(Course, reverse_delete_rule=CASCADE)
    owner = ReferenceField(User, reverse_delete_rule=CASCADE)
    is_exam = BooleanField()
    info = StringField()


# Schemas

class AssignmentSchema(ModelSchema):
    model = Assignment


assignment_schema = AssignmentSchema()
