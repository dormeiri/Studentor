import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subs: Subscription;
  isReady: Boolean = false;
  isAuthenticated: Boolean = false;
  opened: boolean;

  title = 'Studentor';

  constructor(private auth: AuthService) {
    auth.loginStateChanged$.subscribe(state => this.isAuthenticated = state)
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  checkAuth(): void {
    this.isReady = false;
    this.isAuthenticated = !!this.auth.getToken();
    this.isReady = true;
  }
}
