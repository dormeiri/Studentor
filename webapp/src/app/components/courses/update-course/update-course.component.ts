import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  subs: Subscription;
  data: Course;
  form: FormGroup;

  constructor(
    private coursesService: CoursesService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      info: [''],
    });

    this.activatedRoute.params.subscribe(params => {
      this.loadData(params['id']);
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  loadData(id: String): void {
    this.subs = this.coursesService.getCourse(id).subscribe(
      (data: Course) => {
        this.data = data;
        this.setFormFromData();
      },
      (err) => {
        this.notifyService.showError(err, 'Course');
      });
  }

  setFormFromData(): void {
    this.form.controls['name'].setValue(this.data.name);
    this.form.controls['info'].setValue(this.data.info);
  }

  setDataFromForm(): void {
    this.data.name = this.form.value.name;
    this.data.info = this.form.value.info;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.setDataFromForm();
    this.subs = this.coursesService.putCourse(this.data).subscribe(
      (data) => {
        this.notifyService.showSuccess('Success', 'Course Update');
        this.router.navigateByUrl('/courses')
      },
      (err) => {
        this.notifyService.showError(err, 'Course');
      }
    );
  }
}
