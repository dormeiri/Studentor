import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectService {

  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      this.router.navigateByUrl('/status');
      return false;
    }
    else {
      return true;
    }
  }
}
