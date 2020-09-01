from mongoengine import connect


def register_db(app):
    dbname = app.config['MONGO_DBNAME']
    host = app.config['MONGO_HOST']
    port = app.config['MONGO_PORT']

    connect(dbname, host=host, port=port, connect=False)
