from marshmallow import ValidationError
from flask import request, Blueprint, abort
from dataaccess.auth import (
    get_authenticated_user, auth_required, exposed, get_my
)
from extensions import context
from responses import ok
from models.course import create_course_schema, update_course_schema


courses_blueprint = Blueprint('/courses', __name__)


@courses_blueprint.route('/courses/<id>', methods=['GET'])
@auth_required
def get_course(id):
    course = context.courses.find(id)

    if not course:
        abort(404)

    if not exposed(course, 'admin'):
        abort(403)

    return ok(course)


@courses_blueprint.route('/courses', methods=['GET'])
@auth_required
def get_courses():
    courses = get_my(context.courses)

    return ok(list(courses))


@courses_blueprint.route('/courses', methods=['POST'])
@auth_required
def post_course():
    try:
        data = create_course_schema.load(request.get_json())

        user = get_authenticated_user()
        data['user_id'] = user['_id']

        context.courses.create(data)

        return ok()
    except ValidationError:
        abort(400)


@courses_blueprint.route('/courses', methods=['PUT'])
@auth_required
def put_course():
    try:
        data = update_course_schema.load(request.get_json())
        id = data.pop('_id')

        old = context.courses.find(id)

        if not old:
            abort(400)

        if not exposed(old, 'admin'):
            abort(403)

        context.courses.update(id, data)

        return ok()
    except ValidationError:
        abort(400)


@courses_blueprint.route('/courses/<id>', methods=['DELETE'])
@auth_required
def delete_user(id):
    course = context.courses.find(id)

    if not course:
        abort(404)

    if not exposed(course, 'admin'):
        abort(403)

    context.courses.delete(id)

    return ok()
