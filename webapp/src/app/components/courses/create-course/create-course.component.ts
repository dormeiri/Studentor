import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit, OnDestroy {

  subs: Subscription;
  data: Course;
  form: FormGroup;

  constructor(
    private coursesService: CoursesService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      info: [''],
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let values = this.form.value;
    let entity = new Course(values.name, values.info);
    this.subs = this.coursesService.postCourse(entity).subscribe(
      (data) => {
        this.notifyService.showSuccess('Course created', 'Course');
      },
      (err) => {
        this.notifyService.showError(err, 'Course');
      }
    );
  }
}
