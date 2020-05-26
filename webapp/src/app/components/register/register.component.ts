import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';
import { User } from 'src/app/models/user.model';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  subs: Subscription;
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), 
        Validators.required
      ]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subs?.unsubscribe();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    let values = this.form.value;
    let entity = new User(values.email, values.password, values.first_name, values.last_name);
    this.subs = this.authService.register(entity).subscribe(
      () => {
        this.onRegister(entity);
      },
      (err) => {
        console.log(err)
        this.notifyService.showError(err, 'Register');
      }
    );

    this.form.reset();
  }

  onRegister(user: User) {
    let creds = new Login(user.email, user.password);
    this.subs = this.authService.login(creds).subscribe(
      (user) => {
        this.authService.storeTokens(user);
        this.notifyService.showSuccess('Login successfuly', 'Login');
        this.router.navigateByUrl('/home')
      },
      (err) => {
        console.log(err)
        this.notifyService.showError(err, 'Login');
      }
    );
  }
}
