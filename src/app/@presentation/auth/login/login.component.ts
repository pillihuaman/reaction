import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AuthenticationRepository } from '../../../@domain/repository/repository/authentication.repository';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../@domain/repository/models/user';
import { CoreImportsModule } from '../../../core-imports';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]

})
export class LoginComponent implements OnInit, OnDestroy {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  appName: string = 'AlamodaPeru.com';
  logging: boolean = false;
  loginForm: FormGroup;
  hasError: boolean | undefined;
  private unsubscribe: Subscription[] = [];
  returnUrl: string = '/home';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationRepository,
    private dialog: MatDialog
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {}

  submit() {
    try {
      this.hasError = false;
      const loginSubscr = this.authService
        .login(this.f['user'].value, this.f['password'].value)
        .pipe(first())
        .subscribe((user: User) => {
          if (user) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        });

      this.unsubscribe.push(loginSubscr);
    } catch (e) {
      console.error("An error occurred:", e);
      throw e;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(sub => sub.unsubscribe());
  }
}
