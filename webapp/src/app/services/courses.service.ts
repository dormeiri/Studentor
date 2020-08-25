import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course.model';
import { BaseCrudService } from './base-crud-service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseCrudService<Course> {
  constructor(http: HttpClient) {
    super('courses', http)
  }
}
