import { BaseCrudModel } from './base-crud-model';

export class User extends BaseCrudModel {
    email: String;
    password: String;
    first_name: String;
    last_name: String;
    roles: String[];

    constructor(
        email: String,
        password: String,
        first_name: String,
        last_name: String
    ) {
        super();
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.roles = ['user']
    }
}
