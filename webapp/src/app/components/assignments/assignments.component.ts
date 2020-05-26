import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit, OnDestroy {

  subs: Subscription;
  data: Assignment[];

  constructor(private assignmentsService: AssignmentsService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.loadAssignments();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  deleteAssignment(item: Assignment) {
    this.subs = this.assignmentsService.deleteAssignment(item._id).subscribe(
      ((data: Assignment[]) => {
        this.loadAssignments();
      }),
      (err: string) => {
        this.notifyService.showError(err, "Delete Assignment");
      });
  }

  private loadAssignments() {
    this.subs = this.assignmentsService.getAssignments().subscribe(
      (data: Assignment[]) => {
        this.data = data;
      },
      (err: string) => {
        this.notifyService.showError(err, "Get Assignments");
      });
  }
}
