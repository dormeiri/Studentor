import datetime

from flask import request, Blueprint, abort
from marshmallow import ValidationError

from api.models.user import (
    login_schema, create_user_schema
)
from api.auth import (
    authenticate, deauthenticate, refresh_authentication,
    auth_required, auth_refresh_required,
    AuthenticationError
)
from werkzeug.security import generate_password_hash
from api.extensions import mongo
from api.responses import ok


auth_blueprint = Blueprint('/api/auth', __name__)


@auth_blueprint.route('/api/auth/register', methods=['POST'])
def post_user():
    try:
        data = create_user_schema.load(request.get_json())
        if mongo.db.users.find_one({'email': data['email']}):
            return abort(409)

        data['created_at'] = datetime.datetime.utcnow()
        data['password'] = generate_password_hash(data['password'])
        mongo.db.users.insert_one(data)

        return ok()
    except ValidationError:
        return abort(400)


@auth_blueprint.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = login_schema.load(request.get_json())
        access_token, refresh_token = authenticate(data)

        return ok({
            'access_token': access_token,
            'refresh_token': refresh_token
        })
    except AuthenticationError as e:
        return abort(e.code)
    except ValidationError:
        return abort(400)


@auth_blueprint.route('/api/auth/refresh', methods=['POST'])
@auth_refresh_required
def refresh():
    return ok(refresh_authentication())


@auth_blueprint.route('/api/auth/logout', methods=['POST'])
@auth_required
def logout():
    deauthenticate()
    return ok()