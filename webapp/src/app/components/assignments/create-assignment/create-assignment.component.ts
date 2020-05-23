import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Assignment } from 'src/app/models/assignment.model';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  subs: Subscription;
  data: Assignment;
  form: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService, 
    private notifyService: NotifyService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      info: ['', Validators.required],
      due: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let values = this.form.value;
    let entity = new Assignment(values.due, values.title, values.info);
    this.subs = this.assignmentsService.postAssignment(entity).subscribe(
      (data) => {
        this.notifyService.showSuccess('Assignment created', 'Assignment');
        this.router.navigateByUrl('/assignments')
      },
      (err) => {
        console.log(err)
        this.notifyService.showError(err, 'Assignment');
      }
    );
  }
}
