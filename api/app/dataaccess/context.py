from dataaccess.dataset import DataSet


class Context:
    def init_app(self, db):
        self.users = DataSet(db.users)
        self.courses = DataSet(db.courses)
        self.assignments = DataSet(db.assignments)
        self.exams = DataSet(db.exams)
