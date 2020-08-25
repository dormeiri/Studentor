import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamsService } from 'src/app/services/exams.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateExamFormHelper } from './create-exam-form-helper';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit, OnDestroy {

  formHelper: CreateExamFormHelper;


  constructor(
    examsService: ExamsService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new CreateExamFormHelper({
      title: ['', Validators.required],
      info: [''],
      date: [null],
      course_id: [null, Validators.required],
      grade: [null]
    },
      examsService,
      notifyService,
      formBuilder)
  }


  public get form(): FormGroup {
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
