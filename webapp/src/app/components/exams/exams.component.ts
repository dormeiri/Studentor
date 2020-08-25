import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamsService } from 'src/app/services/exams.service';
import { Exam } from 'src/app/models/exam.model';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit, OnDestroy {

  updateId: String;
  subs: Subscription;
  coursesSubs: Subscription;
  data: Exam[];
  courses: Course[];

  constructor(
    private examsService: ExamsService,
    private coursesService: CoursesService,
    private notifyService: NotifyService) {
    examsService.dataUpdated$.subscribe(() => this.loadExams());
    coursesService.dataUpdated$.subscribe(() => this.loadCourses());
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadExams();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
    this.coursesSubs?.unsubscribe();
  }

  deleteExam(item: Exam) {
    this.subs = this.examsService.delete(item._id).subscribe(
      null,
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Delete Exam");
      });
  }

  private loadExams() {
    this.subs = this.examsService.getAll().subscribe(
      (data: Exam[]) => {
        this.data = data;
        this.setCourses();
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Exams");
      });
  }

  private loadCourses() {
    this.coursesSubs = this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.courses = data;
        this.setCourses();
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Courses");
      });
  }

  private setCourses() {
    if (this.data && this.courses) {
      this.data.forEach(exam => {
        exam.course = this.courses.find(course => course._id == exam.course_id);
      });
    }
  }
}
