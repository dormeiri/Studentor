import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateAssignmentFormHelper } from './create-assignment-form-helper';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.scss']
})
export class CreateAssignmentComponent implements OnInit, OnDestroy {

  private formHelper: CreateAssignmentFormHelper;


  constructor(
    assignmentsService: AssignmentsService,
    notifyService: NotifyService,
    formBuilder: FormBuilder) {
    this.formHelper = new CreateAssignmentFormHelper({
      title: ['', Validators.required],
      date: [null],
      grade: [null],
      info: [''],
      course: ['', Validators.required]
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
    this.formHelper.submit();
  }
}
