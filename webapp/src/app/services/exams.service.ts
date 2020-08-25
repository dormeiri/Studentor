import { Injectable } from '@angular/core';
import { BaseCrudService } from './base-crud-service';
import { Exam } from '../models/exam.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamsService extends BaseCrudService<Exam> {
  constructor(http: HttpClient) {
    super('exams', http);
  }
}
