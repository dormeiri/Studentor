import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamsService } from 'src/app/services/exams.service';
import { NotifyService } from 'src/app/services/notify.service';
import { UpdateExamFormHelper } from './update-exam-form-helper';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit, OnDestroy {

  formHelper: UpdateExamFormHelper;

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.formHelper.loadData(data_id);
    }
  }

  @Output() updated = new EventEmitter<boolean>();


  constructor(
    assignmentsService: ExamsService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new UpdateExamFormHelper({
      title: ['', Validators.required],
      info: [''],
      date: [null],
      grade: [null]
    },
      assignmentsService,
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
    this.formHelper.submit((_) => this.updated.emit(true));
  }
}
