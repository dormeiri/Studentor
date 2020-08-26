import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { UpdateCourseFormHelper } from './update-course-form-helper';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit, OnDestroy {

  formHelper: UpdateCourseFormHelper;

  @Output() updated = new EventEmitter<boolean>();


  constructor(
    coursesService: CoursesService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new UpdateCourseFormHelper({
      name: ['', Validators.required],
      info: [''],
    }, coursesService, notifyService, formBuilder);
  }


  get form(): FormGroup {
    return this.formHelper.form;
  }

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.formHelper.loadData(data_id);
    }
  }


  ngOnInit(): void {
    this.formHelper.init();
  }

  ngOnDestroy() {
    this.formHelper.destroy();
  }

  onSubmit() {
    this.formHelper.submit((_) => this.updated.emit(true));
  }
}
