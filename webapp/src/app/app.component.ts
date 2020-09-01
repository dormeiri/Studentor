import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { MenuItem } from './models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription;
  isReady: Boolean = false;
  isAuthenticated: Boolean = false;
  opened: boolean;

  menuItems: MenuItem[] = [
    new MenuItem('Assignments', '/assignments', true),
    new MenuItem('Courses', '/courses', true),
    new MenuItem('Logout', '/logout', true),
    new MenuItem('Register', '/register', false),
    new MenuItem('Login', '/login', false),
  ];

  filteredMenuItems: MenuItem[];

  constructor(private auth: AuthService) {
    auth.loginStateChanged$.subscribe(state => this.setState(state));
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  checkAuth(): void {
    this.isReady = false;
    this.setState(!!this.auth.getToken());
    this.isReady = true;
  }

  setState(state: Boolean): void {
    this.isAuthenticated = state;

    this.filteredMenuItems = this.menuItems.filter(
      item => item.ensureAuthenticated == this.isAuthenticated
    );
  }
}
