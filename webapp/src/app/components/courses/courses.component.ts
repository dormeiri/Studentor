import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { CoursesService } from 'src/app/services/courses.service';
import { NotifyService } from 'src/app/services/notify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CardItem } from 'src/app/models/common-card/card-item.model';
import { CardActionItem } from 'src/app/models/common-card/card-action-item.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  updateId: String;
  subs: Subscription;
  data: Course[];
  cardItems: CardItem[];

  constructor(private coursesService: CoursesService, private notifyService: NotifyService) { 
    coursesService.dataUpdated$.subscribe(() => this.loadCourses());
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  public deleteCourse(id: String) {
    this.subs = this.coursesService.delete(id).subscribe(
      null,
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Delete Course");
      });
  }

  private loadCourses() {
    this.subs = this.coursesService.getAll().subscribe(
      (data: Course[]) => {
        this.data = data;
        this.setCardItems()
      },
      (err: HttpErrorResponse) => {
        this.notifyService.showError(err.message, "Get Courses");
      });
  }

  private setCardItems() {
    this.cardItems = this.data?.map(this.mapCardItem);
  }

  private mapCardItem(value: Course): CardItem {
    return new CardItem(
      value._id,
      `${value.name}`,
      [value.info],
      [],
      new CardActionItem('Delete', 'danger'));
  }
}
