import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbButtonModule, NbDialogConfig, NbDialogModule, NbDialogService, NbInputModule, NbSidebarService } from '@nebular/theme';
import { first, Observable, Subscription, timer } from 'rxjs';
import { AuthenticationRepository } from '../../../@domain/repository/repository/authentication.repository';

import { AuthenticationService } from '../../../@data/services/authentication.service';
import { ModalService } from '../../../@data/services/modal.service';
import { ModalRepository } from '../../../@domain/repository/repository/modal.repository ';
import { User } from '../../../@domain/repository/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NbInputModule, NbButtonModule,NbDialogModule], // Asegúrate de que estos módulos estén aquí
  providers: [NbSidebarService,NbDialogService,
    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    {
      provide: NbDialogConfig,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        closeOnBackdropClick: true,
        closeOnEsc: true,
      },
    },
  ]
  
})
export class LoginComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  everySecond$: Observable<number> = timer(0, 100);
  appName: string = 'AlamodaPeru.com';
  logging: boolean = false;
  loginForm: FormGroup;
  hasError: boolean | undefined;
  private unsubscribe: Subscription[] = [];
  returnUrl: string = '/home';

  constructor(
    private sidebarService: NbSidebarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationRepository,
    private dialogService: NbDialogService
  ) {
    // Inicializa el formulario
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
          //debugger;
          if (user) {

            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        });

      this.unsubscribe.push(loginSubscr);
    } catch (e) {
      //debuger;
      console.error("An error occurred:", e); // Log the error to the console
      throw e; // Rethrow
    } finally {
    }
  }
}
