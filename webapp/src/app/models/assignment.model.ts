export class Assignment {
    user_id: String;
    due: Date;
    title: String;
    info: String;

    constructor(due: Date, title: String, info: String) {
        this.due = due;
        this.title = title;
        this.info = info;
    }
}
