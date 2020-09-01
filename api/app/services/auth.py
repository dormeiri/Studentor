from functools import wraps
from flask_jwt_extended import (
    create_access_token, create_refresh_token, get_jwt_identity,
    verify_jwt_in_request, verify_jwt_refresh_token_in_request
)
from werkzeug.security import check_password_hash
from models.user import User


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


def authenticate(email, password):
    user = User.objects(email=email).only('password').first()

    if not (user and check_password_hash(user.password, password)):
        raise InvalidCredentials()

    identity = _get_access_identity(user)

    access_token = create_access_token(identity)
    refresh_token = create_refresh_token(identity)

    return {
        'access_token': access_token,
        'refresh_tokrn': refresh_token
    }


def refresh_authentication():
    identity = get_jwt_identity()

    return create_access_token(identity)


def get_authenticated_user():
    id = get_jwt_identity()['_id']

    user = User.objects().only().with_id(id)

    if not user:
        raise UserNotFound()

    return user


def auth_required(refresh=False):
    def callable(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if refresh:
                verify_jwt_refresh_token_in_request()
            else:
                verify_jwt_in_request()

            return func(*args, **kwargs)
        return wrapper
    return callable


def roles_required(roles):
    def callable(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            user = get_authenticated_user()
            if not any(map(lambda role: role in roles, user['roles'])):
                raise AccessDenied()

            return func(*args, **kwargs)
        return wrapper
    return callable


def _get_access_identity(user):
    return {'_id': user.id}
