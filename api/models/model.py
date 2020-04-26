from bson import ObjectId
from marshmallow import Schema, EXCLUDE, fields


Schema.TYPE_MAPPING[ObjectId] = fields.Str


class BaseSchema(Schema):
    class Meta:
        unknown = EXCLUDE
