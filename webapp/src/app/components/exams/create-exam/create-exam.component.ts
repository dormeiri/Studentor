import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Exam } from 'src/app/models/exam.model';
import { ExamsService } from 'src/app/services/exams.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit, OnDestroy {

  showCreateCourse: Boolean;

  subs: Subscription;
  data: Exam;
  courses: Course[];
  form: FormGroup;

  constructor(
    private examsService: ExamsService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: [''],
      date: [null],
      course_id: [null, Validators.required],
      grade: [null]
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
    let entity = new Exam(values.course_id, values.date, values.title, values.info, values.grade);
    this.subs = this.examsService.post(entity).subscribe(
      () => {
        this.notifyService.showSuccess('Exam created', 'Exam');
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Exam');
      }
    );
  }
}
