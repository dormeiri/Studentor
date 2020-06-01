import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit, OnDestroy {

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.loadData(data_id);
    }
  }

  @Output() updated = new EventEmitter<boolean>();

  subs: Subscription;
  data: Assignment;
  form: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: [''],
      due: [null]
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  loadData(id: string): void {
    this.subs = this.assignmentsService.getAssignment(id).subscribe(
      (data: Assignment) => {
        this.data = data;
        this.setFormFromData();
      },
      (err) => {
        this.notifyService.showError(err, 'Assignment');
      });
  }

  setFormFromData(): void {
    this.form.controls['title'].setValue(this.data.title);
    this.form.controls['info'].setValue(this.data.info);
    this.form.controls['due'].setValue(!this.data.due ? null : new Date(this.data.due));
  }

  setDataFromForm(): void {
    this.data.title = this.form.value.title;
    this.data.info = this.form.value.info;
    this.data.due = this.form.value.due;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.setDataFromForm();
    this.subs = this.assignmentsService.putAssignment(this.data).subscribe(
      () => {
        this.notifyService.showSuccess('Success', 'Assignment Update');
        this.updated.emit(true);
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Assignment');
      }
    );
  }
}
