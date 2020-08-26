import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEventPattern } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { BaseFormHelper } from 'src/app/helpers/basic-form/base-form-helper';
import { CreateCourseFormHelper } from './create-course-form-helper';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit, OnDestroy {

  private formHelper: BaseFormHelper<Course>;


  constructor(
    coursesService: CoursesService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new CreateCourseFormHelper({
      name: ['', Validators.required],
      info: [''],
    },
      coursesService,
      notifyService,
      formBuilder);
  }


  get form(): FormGroup {
    return this.formHelper.form;
  }


  ngOnInit(): void {
    this.formHelper.init();
  }

  ngOnDestroy() {
    this.formHelper.destroy();
  }

  onSubmit() {
    this.formHelper.submit();
  }
}
