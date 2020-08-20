from flask import jsonify


def ok(data=None, code=200):
    return (
        jsonify(data) if data else "",
        code
    )
