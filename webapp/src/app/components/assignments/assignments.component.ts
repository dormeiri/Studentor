import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  subs: Subscription;
  data: Assignment[];

  constructor(private assignmentsService: AssignmentsService, private notifyService: NotifyService) {
    assignmentsService.dataUpdated$.subscribe(() => this.loadAssignments());
   }

  ngOnInit(): void {
    this.loadAssignments();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  deleteAssignment(item: Assignment) {
    this.subs = this.assignmentsService.deleteAssignment(item._id).subscribe(
      null,
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Delete Assignment");
      });
  }

  private loadAssignments() {
    this.subs = this.assignmentsService.getAssignments().subscribe(
      (data: Assignment[]) => {
        this.data = data;
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Assignments");
      });
  }
}
