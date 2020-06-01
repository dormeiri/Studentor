from marshmallow import fields
from .model import BaseSchema


class CreateCourseSchema(BaseSchema):
    user_id = fields.Str(dump_only=True)
    name = fields.Str(required=True)
    info = fields.Str()


class UpdateCourseSchema(BaseSchema):
    _id = fields.Str(required=True)
    user_id = fields.Str(required=True)
    name = fields.Str(required=True)
    info = fields.Str()


create_course_schema = CreateCourseSchema()
update_course_schema = UpdateCourseSchema()
