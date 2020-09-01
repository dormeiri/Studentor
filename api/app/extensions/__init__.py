from extensions.jwt import register_jwt
from extensions.encoder import register_encoder
from extensions.db import register_db
from extensions.blueprints import register_blueprints
from extensions.error_handlers import register_error_handlers


def register_extensions(app):
    register_jwt(app)
    register_encoder(app)
    register_db(app)
    register_blueprints(app)
    register_error_handlers(app)
