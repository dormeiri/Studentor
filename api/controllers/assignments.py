from marshmallow import ValidationError
from bson.objectid import ObjectId
from flask import request, Blueprint, abort
from api.dataaccess.auth import get_authenticated_user, auth_required, roles_required
from api.extensions import mongo
from api.responses import ok
from api.models.assignment import create_assignment_schema, update_assignment_schema


assignments_blueprint = Blueprint('/api/assignments', __name__)


@assignments_blueprint.route('/api/assignments/<id>', methods=['GET'])
@auth_required
def get_assignment(id):
    assignment = mongo.db.assignments.find_one({'_id': ObjectId(id)})

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
    assignments = mongo.db.assignments.find({'user_id': user['_id']})
    return ok(list(assignments))


@assignments_blueprint.route('/api/assignments', methods=['POST'])
@auth_required
def post_assignment():
    try:
        data = create_assignment_schema.load(request.get_json())
        user = get_authenticated_user()
        
        data['user_id'] = user['_id']
        data['course_id'] = ObjectId(data['course_id'])
        course = mongo.db.courses.find_one({'_id': ObjectId(data['course_id'])})

        if not course:
            abort(400)

        if 'admin' not in user['roles'] and course['user_id'] != user['_id']:
            abort(403)

        result = mongo.db.assignments.insert_one(data)
        print(result)

        return ok()
    except ValidationError:
        abort(400)


@assignments_blueprint.route('/api/assignments', methods=['PUT'])
@auth_required
def put_assignment():
    try:
        data = update_assignment_schema.load(request.get_json())
        user = get_authenticated_user()

        print(data)

        id = data.pop('_id')
        data['user_id'] = ObjectId(data['user_id'])
        
        if 'admin' not in user['roles'] and data['user_id'] != user['_id']:
            abort(403)
        
        result = mongo.db.assignments.update_one({'_id': ObjectId(id)}, {'$set': data})

        return ok()
    except ValidationError:
        abort(400)


@assignments_blueprint.route('/api/assignments/<id>', methods=['DELETE'])
@auth_required
def delete_user(id):
    assignment = mongo.db.assignments.find_one({'_id': ObjectId(id)})

    if not assignment:
        abort(404)

    user = get_authenticated_user()
    if 'admin' not in user['roles'] and assignment['user_id'] != user['_id']:
        abort(403)

    resp = mongo.db.assignments.delete_one({'_id': ObjectId(id)})

    return ok()
