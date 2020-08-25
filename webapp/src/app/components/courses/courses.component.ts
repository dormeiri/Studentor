import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  updateId: String;
  subs: Subscription;
  data: Course[];

  constructor(private coursesService: CoursesService, private notifyService: NotifyService) { 
    coursesService.dataUpdated$.subscribe(() => this.loadCourses());
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  deleteCourse(item: Course) {
    this.subs = this.coursesService.delete(item._id).subscribe(
      null,
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Delete Course");
      });
  }

  private loadCourses() {
    this.subs = this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.data = data;
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Courses");
      });
  }

}
