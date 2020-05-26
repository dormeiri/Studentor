import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-assignment',
  templateUrl: './update-assignment.component.html',
  styleUrls: ['./update-assignment.component.css']
})
export class UpdateAssignmentComponent implements OnInit {

  subs: Subscription;
  data: Assignment;
  form: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: [''],
      due: ['']
    });

    this.activatedRoute.params.subscribe(params => {
      this.loadData(params['id']);
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  loadData(id: String): void {
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
    this.form.controls['due'].setValue(new Date(this.data.due));
    // this.form = this.formBuilder.group({
    //   title: [this.data.title, Validators.required],
    //   info: [this.data.info],
    //   due: [this.data.due]
    // });
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
      (data) => {
        this.notifyService.showSuccess('Success', 'Assignment Update');
        this.router.navigateByUrl('/assignments')
      },
      (err) => {
        this.notifyService.showError(err, 'Assignment');
      }
    );
  }

}
