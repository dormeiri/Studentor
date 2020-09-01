import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginRedirectService } from './services/login-redirect.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectService]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/assignments'
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [EnsureAuthenticatedService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
