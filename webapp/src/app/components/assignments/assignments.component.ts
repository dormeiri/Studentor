import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Subscription } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  subs: Subscription;
  data: Assignment[];

  constructor(private assignmentsService: AssignmentsService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.loadAssignments();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private loadAssignments() {
    this.subs = this.assignmentsService.getAssignments().subscribe(
      (data: Assignment[]) => {
        this.data = data;
      },
      (err: string) => {
        this.notifyService.showError(err, "Assignments");
      });
  }
}
