from marshmallow import ValidationError
from flask import request, Blueprint, abort
from dataaccess.auth import (
    get_authenticated_user, auth_required, exposed, get_my
)
from extensions import context
from responses import ok
from models.exam import (
    create_exam_schema, update_exam_schema
)


exams_blueprint = Blueprint('/exams', __name__)


@exams_blueprint.route('/exams/<id>', methods=['GET'])
@auth_required
def get_exam(id):
    exam = context.exams.find(id)

    if not exam:
        abort(404)

    if not exposed(exam, 'admin'):
        abort(403)

    return ok(exam)


@exams_blueprint.route('/exams', methods=['GET'])
@auth_required
def get_exams():
    exams = get_my(context.exams).sort('due')

    return ok(list(exams))


@exams_blueprint.route('/exams', methods=['POST'])
@auth_required
def post_exam():
    try:
        data = create_exam_schema.load(request.get_json())
        user = get_authenticated_user()

        data['user_id'] = user['_id']
        course = context.courses.find(data['course_id'])

        if not course:
            abort(400)

        if not exposed(course, 'admin'):
            abort(403)

        context.exams.create(data)

        return ok()
    except ValidationError:
        abort(400)


@exams_blueprint.route('/exams', methods=['PUT'])
@auth_required
def put_exam():
    try:
        data = update_exam_schema.load(request.get_json())
        id = data.pop('_id')

        old = context.exams.find(id)

        if not old:
            abort(400)

        if not exposed(old, 'admin'):
            abort(403)

        context.exams.update(id, data)

        return ok()
    except ValidationError:
        abort(400)


@exams_blueprint.route('/exams/<id>', methods=['DELETE'])
@auth_required
def delete_user(id):
    exam = context.exams.find(id)

    if not exam:
        abort(404)

    if not exposed(exam, 'admin'):
        abort(403)

    context.exams.delete(id)

    return ok()
