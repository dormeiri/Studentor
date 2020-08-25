import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExamsService } from 'src/app/services/exams.service';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-exam',
  templateUrl: './update-exam.component.html',
  styleUrls: ['./update-exam.component.css']
})
export class UpdateExamComponent implements OnInit, OnDestroy {

  @Input()
  set data_id(data_id: string) {
    if (data_id) {
      this.loadData(data_id);
    }
  }

  @Output() updated = new EventEmitter<boolean>();

  subs: Subscription;
  data: Exam;
  form: FormGroup;

  constructor(
    private examsService: ExamsService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: [''],
      date: [null],
      grade: [null]
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  loadData(id: string): void {
    this.subs = this.examsService.get(id).subscribe(
      (data: Exam) => {
        this.data = data;
        this.setFormFromData();
      },
      (err) => {
        this.notifyService.showError(err, 'Exam');
      });
  }

  setFormFromData(): void {
    this.form.controls['title'].setValue(this.data.title);
    this.form.controls['info'].setValue(this.data.info);
    this.form.controls['date'].setValue(!this.data.date ? null : new Date(this.data.date));
    this.form.controls['grade'].setValue(this.data.grade);
  }

  setDataFromForm(): void {
    this.data.title = this.form.value.title;
    this.data.info = this.form.value.info;
    this.data.date = this.form.value.date;
    this.data.grade = this.form.value.grade;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.setDataFromForm();
    this.subs = this.examsService.put(this.data).subscribe(
      () => {
        this.notifyService.showSuccess('Success', 'Exam Update');
        this.updated.emit(true);
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Exam');
      }
    );
  }
}
