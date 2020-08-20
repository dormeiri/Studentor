from marshmallow import fields
from models.model import BaseSchema


class LoginSchema(BaseSchema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class UpdateUserSchema(BaseSchema):
    password = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    roles = fields.List(fields.Str)


class CreateUserSchema(BaseSchema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    created_at = fields.DateTime(dumps_only=True)
    roles = fields.List(fields.Str, required=True)


login_schema = LoginSchema()
create_user_schema = CreateUserSchema()
update_user_schema = UpdateUserSchema()
