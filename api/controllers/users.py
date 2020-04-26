from marshmallow import ValidationError
from bson.objectid import ObjectId
from flask import request, Blueprint, abort
from werkzeug.security import generate_password_hash
from api.auth import get_authenticated_user, auth_required, roles_required
from api.extensions import mongo
from api.responses import ok
from api.models.user import update_user_schema

users_blueprint = Blueprint('/api/users', __name__)


@users_blueprint.route('/api/users/me', methods=['GET'])
@auth_required
def me():
    return ok(get_authenticated_user())


@users_blueprint.route('/api/users', methods=['PUT'])
@auth_required
def put_user():
    try:
        data = update_user_schema.load(request.get_json())
        current_user = get_authenticated_user()
        user = mongo.db.users.find_one({'_id': current_user['_id']})

        if 'password' in data:
            data['password'] = generate_password_hash(data['password'])

        mongo.db.users.update_one(
            {'_id': ObjectId(user['_id'])},
            {'$set': data}
        )

        return ok()
    except ValidationError:
        abort(400)


@users_blueprint.route('/api/users/<id>', methods=['DELETE'])
@roles_required(['admin'])
def delete_user(id):
    resp = mongo.db.users.delete_one({'_id': ObjectId(id)})
    if resp.deleted_count > 0:
        return ok()
    else:
        abort(404)
