import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { UpdateAssignmentFormHelper } from './update-assignment-form-helper';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.scss']
})
export class UpdateAssignmentComponent implements OnInit, OnDestroy {

  formHelper: UpdateAssignmentFormHelper;

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.formHelper.loadData(data_id);
    }
  }

  @Output() updated = new EventEmitter<boolean>();


  constructor(
    assignmentsService: AssignmentsService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new UpdateAssignmentFormHelper({
      title: ['', Validators.required],
      info: [''],
      due: [null]
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
