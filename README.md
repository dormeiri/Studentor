# Studentor (under development)

A tasks management system customized for the student needs. Keep your assignments, exams and gaps handled in a single place.

Feel free to share your needs and ideas for a better studying environment

## Local run

### Requirements

1. MongoDB
1. npm + Angular-CLI
1. Python

### Envrionment variables

| Environment variable | Description | Example |
| :--- | :--- | :--- |
| STUDENTOR_MONGO_URI | Used to access the MongoDB server | mongodb://localhost:27017/studentor |
| STUDENTOR_JWT_SECRET_KEY | Secret key for JWT | secret-key123 |

### Install dependecies

#### Python

1. In `/api` folder run `pip install -r requirements.txt`

#### Angular

Run terminal in the folder `/webapp` and then run the command `npm install`

### Run

1. Run MongoDB server with `mongod --dbpath={{mongodb data path}}`
1. In the root folder run `python -m api.dbinit`
1. In the root folder run `python -m api.main`
1. In `/webapp` folder run the command `ng serve`
