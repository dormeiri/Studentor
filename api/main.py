from flask import Flask
from flask_cors import CORS

from api.extensions import JSONEncoder, mongo, jwt
from api.controllers.auth import auth_blueprint
from api.controllers.users import users_blueprint
from api.controllers.assignments import assignments_blueprint


def create_app():
    app = Flask(__name__)

    app.json_encoder = JSONEncoder

    register_config(app)
    register_extensions(app)
    register_blueprints(app)

    CORS(app)

    return app


def register_config(app):
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/studentor'
    app.config['MONGO_DBNAME'] = 'db'
    app.config['JWT_SECRET_KEY'] = '>e:fjS4kf_zJMEh&Kr5QgpozPQnjmDUrdQF*up5bs(W5Lb*5f+gGZ8(]FrC%TwwQ'


def register_extensions(app):
    mongo.init_app(app)
    jwt.init_app(app)


def register_blueprints(app):
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(users_blueprint)
    app.register_blueprint(assignments_blueprint)


if __name__ == '__main__':
    create_app().run()
