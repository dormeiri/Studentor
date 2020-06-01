import { Course } from './course.model';

export class Assignment {
    _id: String;
    user_id: String;
    course_id: String;
    due: Date;
    title: String;
    info: String;
    course: Course;

    constructor(course_id: String, due: Date, title: String, info: String) {
        this.course_id = course_id;
        this.due = due;
        this.title = title;
        this.info = info;
    }
}