from mongoengine import ValidationError, NotUniqueError
from flask import request, Blueprint
from models.user import user_schema
from services.auth import (
    authenticate, refresh_authentication, auth_required, AuthenticationError
)
from werkzeug.security import generate_password_hash
from services.responses import ok, bad_request, json_response


auth_blueprint = Blueprint('/auth', __name__, url_prefix='/auth')


@auth_blueprint.route('/register', methods=['POST'])
def register():
    try:
        json = request.get_json()

        if 'password' in json:
            json['password'] = generate_password_hash(json['password'])

        user = user_schema.load(json).save()

        return ok(user_schema.dump(user))

    except ValidationError as err:
        return bad_request(err.to_dict())

    except NotUniqueError:
        return bad_request('User already exists')


@auth_blueprint.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        email = data.get('email')
        password = data.get('password')

        return ok(authenticate(email, password))

    except AuthenticationError as err:
        return json_response(None, err.code)

    except ValidationError as err:
        return bad_request(err.to_dict())


@ auth_blueprint.route('/refresh', methods=['POST'])
@ auth_required(refresh=True)
def refresh():
    return ok(refresh_authentication())


@ auth_blueprint.route('/logout', methods=['POST'])
@ auth_required()
def logout():
    # TODO: Revoke token
    return ok()
