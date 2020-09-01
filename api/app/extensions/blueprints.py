from controllers.auth import auth_blueprint
from controllers.courses import courses_blueprint
from controllers.assignments import assignments_blueprint
# from controllers.users import users_blueprint

BLUEPRINTS = [
    auth_blueprint,
    courses_blueprint,
    assignments_blueprint,
    # users_blueprint,
]


def register_blueprints(app):
    root_url_prefix = app.config['APPLICATION_ROOT']
    for blueprint in BLUEPRINTS:
        url_prefix = root_url_prefix + blueprint.url_prefix
        print(url_prefix)
        app.register_blueprint(blueprint, url_prefix=url_prefix)
