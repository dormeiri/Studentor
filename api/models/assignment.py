from marshmallow import fields
from .model import BaseSchema


class CreateAssignmentSchema(BaseSchema):
    course_id = fields.Str(required=True)
    due = fields.DateTime(allow_none=True)
    title = fields.Str(required=True)
    info = fields.Str()


class UpdateAssignmentSchema(BaseSchema):
    _id = fields.Str(required=True)
    due = fields.DateTime(allow_none=True)
    title = fields.Str(required=True)
    info = fields.Str()


create_assignment_schema = CreateAssignmentSchema()
update_assignment_schema = UpdateAssignmentSchema()
