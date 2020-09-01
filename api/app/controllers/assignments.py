from flask import Blueprint, request
from services.data_set import assignments
from services.auth import auth_required, get_authenticated_user
from services.responses import not_found, ok

assignments_blueprint = Blueprint(
    '/assignments', __name__, url_prefix='/assignments')


@assignments_blueprint.route('/<id>', methods=['GET'])
@auth_required()
def get_assignment(id):
    assignment = assignments.context().get(id)

    if not assignment:
        return not_found()

    return ok(assignments.schema.dump(assignment))


@assignments_blueprint.route('', methods=['GET'])
@auth_required()
def get_assignments():
    assignments_list = assignments.context().get()

    return ok(assignments.schema.dump(assignments_list))


@assignments_blueprint.route('', methods=['POST'])
@auth_required()
def post_assignment():
    data = assignments.schema.load(request.get_json())
    data.owner = get_authenticated_user()

    assignment = assignments.context().create(data)

    return ok(assignments.schema.dump(assignment))


@assignments_blueprint.route('/<id>', methods=['PUT'])
@auth_required()
def put_assignment(id):
    data = assignments.context().update(id, request.get_json())

    if not data:
        return not_found()

    return ok(assignments.schema.dump(data))


@assignments_blueprint.route('/<id>', methods=['DELETE'])
@auth_required()
def delete_user(id):
    if not assignments.context().delete(id):
        return not_found()

    return ok()
