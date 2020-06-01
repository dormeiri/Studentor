from marshmallow import ValidationError
from bson.objectid import ObjectId
from flask import request, Blueprint, abort
from api.dataaccess.auth import get_authenticated_user, auth_required, roles_required
from api.extensions import mongo
from api.responses import ok
from api.models.course import create_course_schema, update_course_schema


courses_blueprint = Blueprint('/api/courses', __name__)


@courses_blueprint.route('/api/courses/<id>', methods=['GET'])
@auth_required
def get_course(id):
    course = mongo.db.courses.find_one({'_id': ObjectId(id)})

    if not course:
        abort(404)

    user = get_authenticated_user()
    if 'admin' not in user['roles'] and course['user_id'] != user['_id']:
        abort(403)

    return ok(course)


@courses_blueprint.route('/api/courses', methods=['GET'])
@auth_required
def get_courses():
    user = get_authenticated_user()
    courses = mongo.db.courses.find({'user_id': user['_id']})
    return ok(list(courses))


@courses_blueprint.route('/api/courses', methods=['POST'])
@auth_required
def post_course():
    try:
        data = create_course_schema.load(request.get_json())
        user = get_authenticated_user()
        data['user_id'] = user['_id']

        result = mongo.db.courses.insert_one(data)
        print(result)

        return ok()
    except ValidationError:
        abort(400)


@courses_blueprint.route('/api/courses', methods=['PUT'])
@auth_required
def put_course():
    try:
        data = update_course_schema.load(request.get_json())
        user = get_authenticated_user()

        print(data)

        id = data.pop('_id')
        data['user_id'] = ObjectId(data['user_id'])
        
        if 'admin' not in user['roles'] and data['user_id'] != user['_id']:
            abort(403)
        
        result = mongo.db.courses.update_one({'_id': ObjectId(id)}, {'$set': data})

        return ok()
    except ValidationError:
        abort(400)


@courses_blueprint.route('/api/courses/<id>', methods=['DELETE'])
@auth_required
def delete_user(id):
    course = mongo.db.courses.find_one({'_id': ObjectId(id)})

    if not course:
        abort(404)

    user = get_authenticated_user()
    if 'admin' not in user['roles'] and course['user_id'] != user['_id']:
        abort(403)

    resp = mongo.db.courses.delete_one({'_id': ObjectId(id)})

    return ok()
