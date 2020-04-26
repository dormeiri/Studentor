import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(login : Login): Observable<any> {
    return this.http
    .post(`${environment.apiUrl}/auth/login`, login)
    .pipe(catchError(this.errorHandler))
  }

  

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'server error.');
  } 
}
