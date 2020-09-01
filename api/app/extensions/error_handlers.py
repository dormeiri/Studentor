from services.responses import (
    bad_request, unauthorized, forbidden, not_found, json_response
)
from mongoengine import ValidationError
from services.auth import AuthenticationError


ERROR_HANDLERS = {
    400: bad_request,
    401: unauthorized,
    403: forbidden,
    404: not_found,
    ValidationError: lambda err: bad_request(err.to_dict()),
    AuthenticationError: lambda err: json_response(err.msg, err.code)
}


def register_error_handlers(app):
    for key, value in ERROR_HANDLERS.items():
        app.register_error_handler(key, value)
