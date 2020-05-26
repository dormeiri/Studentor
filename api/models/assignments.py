from marshmallow import fields
from .model import BaseSchema


class CreateAssignmentSchema(BaseSchema):
    user_id = fields.Str(dump_only=True)
    due = fields.DateTime()
    title = fields.Str(required=True)
    info = fields.Str()


class UpdateAssignmentSchema(BaseSchema):
    _id = fields.Str(required=True)
    user_id = fields.Str(required=True)
    due = fields.DateTime()
    title = fields.Str(required=True)
    info = fields.Str()


create_assignment_schema = CreateAssignmentSchema()
update_assignment_schema = UpdateAssignmentSchema()
