# Studentor (under development)

A tasks management system customized for the student needs. Keep your assignments, exams and gaps handled in a single place.

Feel free to share your needs and ideas

## How to run locally?

### Requirements

1. [MongoDB](https://www.mongodb.com/try/download/community)
1. [NPM](https://www.npmjs.com/get-npm) + [Angular-CLI](https://cli.angular.io/)
1. [Python](https://www.python.org/)

### Envrionment variables

| Environment variable | Description | Example |
| :--- | :--- | :--- |
| STUDENTOR_MONGO_URI | Used to access the MongoDB server | mongodb://localhost:27017/studentor |
| STUDENTOR_JWT_SECRET_KEY | Secret key for JWT | secret-key123 |

### Run MongoDB

1. Run the command `mongod --dbpath={{mongodb data path}}` in terminal

### Run API (Pyhon/Flask)

1. In `/api` folder run the command `pip install -r requirements.txt` in terminal
1. In root folder, run the command `python -m api.app` in terminal

### Run Frontend (AngularJS)

1. In `/webapp` folder run the command `npm install` in terminal
1. In `/webapp` folder run the command `ng serve` in terminal
