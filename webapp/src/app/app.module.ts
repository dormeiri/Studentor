import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { EnsureAuthenticatedService } from './services/ensure-authenticated.service';
import { LoginRedirectService } from './services/login-redirect.service';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CreateAssignmentComponent } from './components/assignments/create-assignment/create-assignment.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {MatSidenavModule} from '@angular/material/sidenav';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateAssignmentComponent } from './components/assignments/update-assignment/update-assignment.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CreateCourseComponent } from './components/courses/create-course/create-course.component';
import { UpdateCourseComponent } from './components/courses/update-course/update-course.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, HomeComponent, AssignmentsComponent, CreateAssignmentComponent, LogoutComponent, UpdateAssignmentComponent, CoursesComponent, CreateCourseComponent, UpdateCourseComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatSidenavModule
  ],
  providers: [
    AuthService,
    EnsureAuthenticatedService,
    LoginRedirectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
