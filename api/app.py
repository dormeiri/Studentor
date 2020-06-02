from os import environ

from flask import Flask
from flask_cors import CORS

from api.dbinit import update_index

from api.extensions import JSONEncoder, mongo, jwt
from api.controllers.auth import auth_blueprint
from api.controllers.users import users_blueprint
from api.controllers.assignments import assignments_blueprint
from api.controllers.courses import courses_blueprint


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
    app.config['MONGO_DBNAME'] = 'studentor'
    app.config['JWT_SECRET_KEY'] = environ['STUDENTOR_JWT_SECRET_KEY']


def register_extensions(app):
    mongo.init_app(app)
    jwt.init_app(app)


def register_blueprints(app):
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(users_blueprint)
    app.register_blueprint(assignments_blueprint)
    app.register_blueprint(courses_blueprint)

if __name__ == "__main__":
    create_app().run(debug=True, host='0.0.0.0')
