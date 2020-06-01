import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit, OnDestroy {

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.loadData(data_id);
    }
  }

  @Output() updated = new EventEmitter<boolean>();

  subs: Subscription;
  data: Course;
  form: FormGroup;

  constructor(
    private coursesService: CoursesService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      info: [''],
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  loadData(id: string): void {
    this.subs = this.coursesService.getCourse(id).subscribe(
      (data: Course) => {
        this.data = data;
        this.setFormFromData();
      },
      (err) => {
        this.notifyService.showError(err, 'Course');
      });
  }

  setFormFromData(): void {
    this.form.controls['name'].setValue(this.data.name);
    this.form.controls['info'].setValue(this.data.info);
  }

  setDataFromForm(): void {
    this.data.name = this.form.value.name;
    this.data.info = this.form.value.info;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.setDataFromForm();
    this.subs = this.coursesService.putCourse(this.data).subscribe(
      (data) => {
        this.notifyService.showSuccess('Success', 'Course Update');
        this.updated.emit(true);
      },
      (err) => {
        this.notifyService.showError(err, 'Course');
      }
    );
  }
}
