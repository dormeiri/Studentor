import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login } from 'src/app/models/login.model';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  subs: Subscription;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
        Validators.required
      ]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    let values = this.loginForm.value;
    let creds = new Login(values.email, values.password);
    this.subs = this.authService.login(creds).subscribe(
      (user) => {
        this.authService.storeTokens(user);
        this.notifyService.showSuccess('Login successfuly', 'Login');
        this.router.navigateByUrl('/assignments')
      },
      (err) => {
        this.notifyService.showError(err.message, 'Login');
      }
    );

    this.loginForm.reset();
  }
}
