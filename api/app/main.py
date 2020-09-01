from flask import Flask
from flask_cors import CORS

from extensions import register_extensions
from settings import register_config


def create_app():
    print('Creating app...')

    app = Flask(__name__)

    register_config(app)
    register_extensions(app)
    CORS(app)

    print('app initialized')
    return app


app = create_app()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)
