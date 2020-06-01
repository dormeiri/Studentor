import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Course } from '../models/course.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private dataUpdatedSource = new Subject();

  dataUpdated$ = this.dataUpdatedSource.asObservable();


  constructor(protected http: HttpClient) { }

  public getCourses(): Observable<Course[] | HttpErrorResponse> {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  public getCourse(id: String): Observable<Course | HttpErrorResponse> {
    return this.http.get<Course>(`${environment.apiUrl}/courses/${id}`);
  }

  public postCourse(data: Course): Observable<any> {
    return this.http.post(`${environment.apiUrl}/courses`, data)
      .pipe(tap(() => this.dataUpdatedSource.next()));
  }

  public putCourse(data: Course): Observable<any> {
    return this.http.put(`${environment.apiUrl}/courses`, data)
      .pipe(tap(() => this.dataUpdatedSource.next()));
  }

  public deleteCourse(id: String): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/courses/${id}`)
      .pipe(tap(() => this.dataUpdatedSource.next()));
  }
}
