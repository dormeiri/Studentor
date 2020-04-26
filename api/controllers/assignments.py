from bson.objectid import ObjectId
from flask import request, Blueprint, abort
from marshmallow import ValidationError

from api.models.assignments import (
    create_assignment_schema
)
from api.auth import (
    get_authenticated_user, auth_required, roles_required
)
from api.extensions import mongo
from api.responses import ok


assignments_blueprint = Blueprint('/api/assignments', __name__)


@assignments_blueprint.route('/api/assignments/<id>', methods=['GET'])
@auth_required
def get_assignment(id):
    assignment = mongo.db.assignments.find_one({'_id': id})

    if not assignment:
        abort(404)

    user = get_authenticated_user()
    if 'admin' not in user['roles'] and assignment['user_id'] != user['_id']:
        abort(403)

    return ok(assignment)


@assignments_blueprint.route('/api/assignments', methods=['GET'])
@auth_required
def get_assignments():
    user = get_authenticated_user()
    assignment = mongo.db.assignments.find({'user_id': user['_id']})
    return ok(list(assignment))


@assignments_blueprint.route('/api/assignments', methods=['POST'])
@auth_required
def post_assignment():
    try:
        data = create_assignment_schema.load(request.get_json())
        user = get_authenticated_user()
        print(request.get_json())
        print(data)
        data['user_id'] = user['_id']

        mongo.db.assignments.insert_one(data)

        return ok()
    except ValidationError:
        result = abort(400)

    return result


@assignments_blueprint.route('/api/assignments/<id>', methods=['DELETE'])
@roles_required(['admin'])
def delete_user(id):
    resp = mongo.db.assignments.delete_one({'_id': ObjectId(id)})
    if resp.deleted_count:
        return ok()
    else:
        return abort(404)