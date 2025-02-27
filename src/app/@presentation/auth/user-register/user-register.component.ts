
import { NbButtonModule, NbComponentStatus, NbDialogConfig, NbDialogModule, NbDialogService, NbInputModule, NbSelectModule, NbSidebarService } from '@nebular/theme';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ModalRepository } from '../../../@domain/repository/repository/modal.repository ';
import { UserRepository } from '../../../@domain/repository/repository/user.repository';
import { GeneralConstans } from '../../../utils/generalConstant';
import { ModalComponent } from '../../@common-components/modal/modal.component';
import { User } from '../../../@data/model/User/user';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../@data/services/authentication.service';
import { ModalService } from '../../../@data/services/modal.service';
import { AuthenticationRepository } from '../../../@domain/repository/repository/authentication.repository';
import { CoreProviders } from '../../../core-providers';
import { CoreImports } from '../../../core-imports';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: true,
  imports: [CoreImports, MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule

  ], // Asegúrate de que estos módulos estén aquí
  providers: [CoreProviders,
    { provide: AuthenticationRepository, useClass: AuthenticationService },
  
  ]
})
export class UserRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  selectedItemType: any;
  user!: User;
  selectedItem: any;
  consoles: String = 'exit';

  constructor(
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private dialogService: NbDialogService,

  ) {}
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      lastName: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ],
      ],
      numTypeDocument: [''],
      typeDocument: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      repeatpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      phoneNumber: [''],
    });
  }
  submit() {

    let data: User = {
      name: this.f['name'].value,
      lastName: this.f['lastName'].value,
      password: this.f['password'].value,
      numTypeDocument: this.f['numTypeDocument'].value,
      email: this.f['email'].value,
      mobilPhone: this.f['phoneNumber'].value,
      userName: this.f['name'].value,
      typeDocument: this.f['typeDocument'].value,
    };
////debugger;
    this.userRepository.registerUser(data).subscribe(
      (value) => {
        this.dialogService.open(ModalComponent, {
          context: { rowData: 'Success' } // `context` is the correct property for passing data

        });
      },
      (error) => {
        this.dialogService.open(ModalComponent, {
          context: { rowData: 'Error' } // `context` is the correct property for passing data
        });
      }
    );
  }
}
