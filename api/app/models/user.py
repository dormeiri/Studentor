from models.base import ModelSchema, Field
from mongoengine import EmailField, StringField, ListField, Document


# Model

class User(Document):
    email = EmailField(required=True, unique=True, null=False)
    password = StringField(required=True, null=False)
    first_name = StringField(max_length=100, required=True, null=False)
    last_name = StringField(max_length=100, required=True, null=False)
    roles = ListField(StringField(max_length=50))


# Schemas

class UserSchema(ModelSchema):
    model = User
    password = Field(load_only=True)


user_schema = UserSchema()
