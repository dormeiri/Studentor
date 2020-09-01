from flask import jsonify


def ok(data=None):
    return json_response(data, 200)


def bad_request(data=None):
    return json_response(data, 400)


def unauthorized(data=None):
    return json_response(data, 401)


def forbidden(data=None):
    return json_response(data, 403)


def not_found(data=None):
    return json_response(data, 404)


def json_response(data, code):
    return jsonify(data), code
