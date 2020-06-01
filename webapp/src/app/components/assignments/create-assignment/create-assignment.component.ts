import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CoursesService } from 'src/app/services/courses.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit, OnDestroy {

  subs: Subscription;
  data: Assignment;
  courses: Course[];
  form: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private coursesService: CoursesService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: [''],
      due: [null],
      course_id: ['', Validators.required]
    });

    this.loadCourses();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      return;
    }

    let values = this.form.value;
    let entity = new Assignment(values.course_id, values.due, values.title, values.info);
    this.subs = this.assignmentsService.postAssignment(entity).subscribe(
      () => {
        this.notifyService.showSuccess('Assignment created', 'Assignment');
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Assignment');
      }
    );
  }

  loadCourses() {
    this.subs = this.coursesService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, 'Courses');
      }
    )
  }
}
