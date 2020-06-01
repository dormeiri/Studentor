import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  updateId: String;
  subs: Subscription;
  coursesSubs: Subscription;
  data: Assignment[];
  courses: Course[];

  constructor(
    private assignmentsService: AssignmentsService,
    private coursesService: CoursesService,
    private notifyService: NotifyService) {
    assignmentsService.dataUpdated$.subscribe(() => this.loadAssignments());
    coursesService.dataUpdated$.subscribe(() => this.loadCourses());
  }

  ngOnInit(): void {
    this.loadCourses();
    this.loadAssignments();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
    this.coursesSubs?.unsubscribe();
  }

  deleteAssignment(item: Assignment) {
    this.subs = this.assignmentsService.deleteAssignment(item._id).subscribe(
      null,
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Delete Assignment");
      });
  }

  private loadAssignments() {
    this.subs = this.assignmentsService.getAssignments().subscribe(
      (data: Assignment[]) => {
        this.data = data;
        this.setCourses();
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Assignments");
      });
  }

  private loadCourses() {
    this.coursesSubs = this.coursesService.getCourses().subscribe(
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
      this.data.forEach(assignment => {
        assignment.course = this.courses.find(course => course._id == assignment.course_id);
      });
    }
  }
}
