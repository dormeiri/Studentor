from marshmallow import ValidationError
from flask import request, Blueprint, abort
from dataaccess.auth import (
    get_authenticated_user, auth_required, exposed, get_my
)
from extensions import context
from responses import ok
from models.assignment import (
    create_assignment_schema, update_assignment_schema
)


assignments_blueprint = Blueprint('/assignments', __name__)


@assignments_blueprint.route('/assignments/<id>', methods=['GET'])
@auth_required
def get_assignment(id):
    assignment = context.assignments.find(id)

    if not assignment:
        abort(404)

    if not exposed(assignment, 'admin'):
        abort(403)

    return ok(assignment)


@assignments_blueprint.route('/assignments', methods=['GET'])
@auth_required
def get_assignments():
    assignments = get_my(context.assignments).sort('due')

    return ok(list(assignments))


@assignments_blueprint.route('/assignments', methods=['POST'])
@auth_required
def post_assignment():
    try:
        data = create_assignment_schema.load(request.get_json())
        user = get_authenticated_user()

        data['user_id'] = user['_id']
        course = context.courses.find(data['course_id'])

        if not course:
            abort(400)

        if not exposed(course, 'admin'):
            abort(403)

        context.assignments.create(data)

        return ok()
    except ValidationError:
        abort(400)


@assignments_blueprint.route('/assignments', methods=['PUT'])
@auth_required
def put_assignment():
    try:
        data = update_assignment_schema.load(request.get_json())
        id = data.pop('_id')

        old = context.assignments.find(id)

        if not old:
            abort(400)

        if not exposed(old, 'admin'):
            abort(403)

        context.assignments.update(id, data)

        return ok()
    except ValidationError:
        abort(400)


@assignments_blueprint.route('/assignments/<id>', methods=['DELETE'])
@auth_required
def delete_user(id):
    assignment = context.assignments.find(id)

    if not assignment:
        abort(404)

    if not exposed(assignment, 'admin'):
        abort(403)

    context.assignments.delete(id)

    return ok()
