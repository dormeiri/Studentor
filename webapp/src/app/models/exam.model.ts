import { Course } from './course.model';
import { BaseCrudModel } from './base-crud-model';

export class Exam extends BaseCrudModel {
    user_id: String;
    course_id: String;
    date: Date;
    title: String;
    info: String;
    grade: Number;
    course: Course;

    constructor(course_id: String, date: Date, title: String, info: String, grade: Number) {
        super()
        this.course_id = course_id;
        this.date = date;
        this.title = title;
        this.info = info;
        this.grade = grade;
    }
}
