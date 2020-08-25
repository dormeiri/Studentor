from os import environ

from flask import Flask
from flask_cors import CORS

from dbinit import update_index

from extensions import JSONEncoder, mongo, jwt, context
from controllers.auth import auth_blueprint
from controllers.users import users_blueprint
from controllers.assignments import assignments_blueprint
from controllers.courses import courses_blueprint
from controllers.exams import exams_blueprint


def create_app():

    print('Creating app...')
    app = Flask(__name__)

    app.json_encoder = JSONEncoder

    register_config(app)
    register_extensions(app)
    register_blueprints(app)

    CORS(app)

    print('Update MongoDB schemes...')
    update_index()

    print('app initialized')
    return app


def register_config(app):
    app.config['MONGO_URI'] = environ['STUDENTOR_MONGO_URI']
    app.config['MONGO_DBNAME'] = environ['STUDENTOR_MONGO_DBNAME']
    app.config['JWT_SECRET_KEY'] = environ['STUDENTOR_JWT_SECRET_KEY']
    app.config['APPLICATION_ROOT'] = '/api'


def register_extensions(app):
    mongo.init_app(app)
    jwt.init_app(app)
    context.init_app(mongo.db)


def register_blueprints(app):
    blueprints = [
        auth_blueprint,
        users_blueprint,
        assignments_blueprint,
        courses_blueprint,
        exams_blueprint
    ]

    url_prefix = app.config['APPLICATION_ROOT']
    for blueprint in blueprints:
        app.register_blueprint(blueprint, url_prefix=url_prefix)


app = create_app()
