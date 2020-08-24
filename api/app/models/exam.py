from marshmallow import fields
from models.model import BaseSchema


class CreateExamSchema(BaseSchema):
    course_id = fields.Str(required=True)
    date = fields.DateTime(allow_none=True)
    title = fields.Str(required=True)
    info = fields.Str()


class UpdateExamSchema(BaseSchema):
    _id = fields.Str(required=True)
    date = fields.DateTime(allow_none=True)
    title = fields.Str(required=True)
    info = fields.Str()


create_exam_schema = CreateExamSchema()
update_exam_schema = UpdateExamSchema()
