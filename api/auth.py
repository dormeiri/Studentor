from datetime import datetime
from flask import abort
from functools import wraps
from bson import ObjectId
from flask_jwt_extended import (
    create_access_token, create_refresh_token, get_jwt_identity,
    verify_jwt_in_request, verify_jwt_refresh_token_in_request
)
from werkzeug.security import check_password_hash
from api.extensions import mongo


class AuthenticationError(Exception):
    def __init__(self, code=None, msg=None):
        self.code = code
        self.msg = msg


class InvalidCredentials(AuthenticationError):
    def __init__(self):
        super().__init__(code=401, msg='Invalid username/password')


class AccountInactive(AuthenticationError):
    def __init__(self):
        super().__init__(code=401, msg='Account inactivated')


class AccessDenied(AuthenticationError):
    def __init__(self):
        super().__init__(code=403, msg='Access denied')


class UserNotFound(AuthenticationError):
    def __init__(self):
        super().__init__(code=404, msg='User not found')


def authenticate(data):
    email = data['email']
    pwd = data['password']

    user = mongo.db.users.find_one({'email': email})
    if not user or not check_password_hash(user['password'], pwd):
        raise InvalidCredentials()

    _update_user_login(user)
    identity = {'_id': user['_id']}

    return (
        create_access_token(identity=identity),
        create_refresh_token(identity=identity)
    )


def deauthenticate():
    user = get_authenticated_user()
    _update_user_logout(user)


def refresh_authentication():
    user = get_authenticated_user()
    _update_user_login(user)
    return create_access_token(identity=user['_id'])


def get_authenticated_user():
    identity = get_jwt_identity()

    user = mongo.db.users.find_one(
        {'_id': ObjectId(identity['_id'])},
        {'password': 0}
    )

    if not user['logged_in']:
        raise AccountInactive()

    if not user:
        raise UserNotFound()

    return user


def auth_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            get_authenticated_user()
        except AuthenticationError as err:
            abort(err.code)

        return func(*args, **kwargs)
    return wrapper


def auth_refresh_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_refresh_token_in_request()
            get_authenticated_user()
        except AuthenticationError as err:
            abort(err.code)

        return func(*args, **kwargs)
    return wrapper


def roles_required(roles):
    def callable(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            try:
                verify_jwt_in_request()
                user = get_authenticated_user()
                if not any(map(lambda role: role in roles, user['roles'])):
                    raise AccessDenied()
            except AuthenticationError as err:
                abort(err.code)

            return func(*args, **kwargs)
        return wrapper
    return callable


def _update_user_login(user):
    mongo.db.users.update_one(
        {'_id': user['_id']},
        {
            '$set': {
                'logged_in': True,
                'last_logged_in': datetime.utcnow()
            }
        }
    )


def _update_user_logout(user):
    mongo.db.users.update_one(
        {'_id': user['_id']},
        {
            '$set': {
                'logged_in': False
            }
        }
    )
