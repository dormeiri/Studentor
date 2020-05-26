import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../models/login.model'
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStateChangedSource = new Subject<boolean>();

  loginStateChanged$ = this.loginStateChangedSource.asObservable();

  constructor(protected http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, login);
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, '');
  }

  storeTokens(tokens: any): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    this.loginStateChangedSource.next(true);
  }

  removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.loginStateChangedSource.next(false);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }
}
