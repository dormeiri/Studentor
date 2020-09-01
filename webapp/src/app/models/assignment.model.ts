import { Course } from './course.model';
import { BaseCrudModel } from './base-crud-model';

export class Assignment extends BaseCrudModel {
    title: String;
    grade: Number;
    date: Date;
    info: String;
    course: String;
    course_data: Course;

    constructor(
        title: String,
        grade: Number,
        date: Date,
        info: String,
        course: String,
    ) {
        super();
        this.title = title;
        this.grade = grade;
        this.date = date;
        this.info = info;
        this.course = course;
    }
}
