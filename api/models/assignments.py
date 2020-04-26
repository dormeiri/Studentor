from marshmallow import fields
from .model import BaseSchema


class CreateAssignmentSchema(BaseSchema):
    user_id = fields.Str(dump_only=True)
    due = fields.DateTime()
    title = fields.Str(required=True)
    info = fields.Str()


class UpdateAssignmentSchema(BaseSchema):
    user_id = fields.Str(dump_only=True)
    due = fields.DateTime()
    title = fields.Str()
    info = fields.Str()


create_assignment_schema = CreateAssignmentSchema()
update_assignment_schema = UpdateAssignmentSchema()
