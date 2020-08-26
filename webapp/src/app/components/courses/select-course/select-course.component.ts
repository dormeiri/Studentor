import { Component, OnInit, Input, forwardRef, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from 'src/app/services/notify.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCourseComponent),
      multi: true
    }
  ]
})
export class SelectCourseComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private _courseId: string;
  private subs: Subscription;

  showCreateCourse: Boolean;
  courses: Course[];

  propagateChange = (_: any) => { };


  constructor(
    private coursesService: CoursesService,
    private notifyService: NotifyService
  ) {
    coursesService.dataUpdated$.subscribe(() => this.loadCourses());
  }


  get courseId(): string {
    return this._courseId;
  }

  set courseId(val: string) {
    this._courseId = val;
    this.propagateChange(this._courseId);
  }


  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this._courseId = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }

  private loadCourses() {
    this.showCreateCourse = false;

    this.subs = this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Courses');
      }
    )
  }
}
