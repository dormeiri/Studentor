import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model'
import { ApiBaseService } from './api-base.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {  }

  login(login: Login): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, login);
  }

  storeTokens(tokens: any): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }
}
