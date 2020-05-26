export class User {
    email: String;
    password: String;
    first_name: String;
    last_name: String;
    roles: String[];

    constructor(email, password, first_name, last_name) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.roles = ['user']
    }
}
