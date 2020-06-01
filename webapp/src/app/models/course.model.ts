export class Course {
    _id: String;
    user_id: String;
    name: String;
    info: String;

    constructor(name: String, info: String) {
        this.name = name;
        this.info = info;
    }
}
