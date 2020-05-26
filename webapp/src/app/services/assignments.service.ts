import { Injectable } from '@angular/core';
import { ApiBaseService } from './api-base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Assignment } from '../models/assignment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(protected http: HttpClient) { }

  public getAssignments(): Observable<Assignment[] | string> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignments`);
  }

  public getAssignment(id: String): Observable<Assignment | string> {
    return this.http.get<Assignment>(`${environment.apiUrl}/assignments/${id}`);
  }

  public postAssignment(data: Assignment): Observable<any> {
    return this.http.post(`${environment.apiUrl}/assignments`, data);
  }

  public putAssignment(data: Assignment): Observable<any> {
    return this.http.put(`${environment.apiUrl}/assignments`, data);
  }

  public deleteAssignment(id: String): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/assignments/${id}`);
  }
}
