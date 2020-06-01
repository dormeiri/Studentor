import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private dataUpdatedSource = new Subject();

  dataUpdated$ = this.dataUpdatedSource.asObservable();

  constructor(protected http: HttpClient) { }

  public getAssignments(): Observable<Assignment[] | HttpErrorResponse> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignments`);
  }

  public getAssignment(id: String): Observable<Assignment | HttpErrorResponse> {
    return this.http.get<Assignment>(`${environment.apiUrl}/assignments/${id}`);

  }

  public postAssignment(data: Assignment): Observable<any> {
    if(!data.due) {
      data.due = null;
    }

    return this.http.post(`${environment.apiUrl}/assignments`, data)
      .pipe(tap(() => this.dataUpdatedSource.next()));

  }

  public putAssignment(data: Assignment): Observable<any> {
    if(!data.due) {
      data.due = null;
    }
    
    return this.http.put(`${environment.apiUrl}/assignments`, data)
      .pipe(tap(() => this.dataUpdatedSource.next()));
  }

  public deleteAssignment(id: String): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/assignments/${id}`)
      .pipe(tap(() => this.dataUpdatedSource.next()));
  }
}
