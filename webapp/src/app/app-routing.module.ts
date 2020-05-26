import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginRedirectService } from './services/login-redirect.service';
import { HomeComponent } from './components/home/home.component';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CreateAssignmentComponent } from './components/assignments/create-assignment/create-assignment.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateAssignmentComponent } from './components/assignments/update-assignment/update-assignment.component';
import { RegisterComponent } from './components/register/register.component';


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
    path: 'home',
    component: HomeComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'assignments',
    component: AssignmentsComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'assignments/create',
    component: CreateAssignmentComponent,
    canActivate: [EnsureAuthenticatedService]
  },
  {
    path: 'assignments/update/:id',
    component: UpdateAssignmentComponent,
    canActivate: [EnsureAuthenticatedService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
