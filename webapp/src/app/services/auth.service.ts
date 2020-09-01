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

  public loginStateChanged$ = this.loginStateChangedSource.asObservable();

  public constructor(protected http: HttpClient) { }

  public register(user: User): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, user);
  }

  public login(login: Login): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, login);
  }

  public logout(): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/logout`, '');
  }

  public storeTokens(tokens: any): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);

    this.loginStateChangedSource.next(true);
  }

  public removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.loginStateChangedSource.next(false);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }
}
