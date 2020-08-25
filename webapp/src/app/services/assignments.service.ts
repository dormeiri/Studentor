import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BaseCrudService } from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService extends BaseCrudService<Assignment> {

  constructor(http: HttpClient) { 
    super('assignments', http);
  }
}
