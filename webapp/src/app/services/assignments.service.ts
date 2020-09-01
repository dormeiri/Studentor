import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Assignment } from '../models/assignment.model';
import { BaseCrudService } from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService extends BaseCrudService<Assignment> {

  constructor(http: HttpClient) {
    super('assignments', http);
  }
}
