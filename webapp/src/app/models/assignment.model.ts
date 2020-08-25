import { Course } from './course.model';
import { BaseCrudModel } from './base-crud-model';

export class Assignment extends BaseCrudModel {
    user_id: String;
    course_id: String;
    due: Date;
    title: String;
    info: String;
    course: Course;

    constructor(course_id: String, due: Date, title: String, info: String) {
        super();
        this.course_id = course_id;
        this.due = due;
        this.title = title;
        this.info = info;
    }
}
