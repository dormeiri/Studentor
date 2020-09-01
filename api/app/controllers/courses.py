from flask import Blueprint, request
from services.data_set import courses
from services.auth import auth_required, get_authenticated_user
from services.responses import not_found, ok

courses_blueprint = Blueprint('/courses', __name__, url_prefix='/courses')


@courses_blueprint.route('/<id>', methods=['GET'])
@auth_required()
def get_course(id):
    course = courses.context().get(id)

    if not course:
        return not_found()

    return ok(courses.schema.dump(course))


@courses_blueprint.route('', methods=['GET'])
@auth_required()
def get_courses():
    courses_list = courses.context().get()

    return ok(courses.schema.dump(courses_list))


@courses_blueprint.route('', methods=['POST'])
@auth_required()
def post_course():
    data = courses.schema.load(request.get_json())
    data.owner = get_authenticated_user()

    course = courses.context().create(data)

    return ok(courses.schema.dump(course))


@courses_blueprint.route('/<id>', methods=['PUT'])
@auth_required()
def put_course(id):
    course = courses.context().update(id, request.get_json())

    if not course:
        return not_found()

    return ok(courses.schema.dump(course))


@courses_blueprint.route('/<id>', methods=['DELETE'])
@auth_required()
def delete_user(id):
    if not courses.context().delete(id):
        return not_found()

    return ok()
