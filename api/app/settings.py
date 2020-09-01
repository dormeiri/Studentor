from os import environ


SETTINGS = {
    'MONGO_HOST': environ.get('MONGO_HOST', 'db'),
    'MONGO_PORT': environ.get('MONGO_PORT', 27017),
    'MONGO_DBNAME': environ.get('MONGO_DBNAME', 'studentor'),
    'SECRET_KEY': environ.get('SECRET_KEY', 'secret key'),
    'APPLICATION_ROOT': '/api',
}


def register_config(app):
    for key, value in SETTINGS.items():
        app.config[key] = value
