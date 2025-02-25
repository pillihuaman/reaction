import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserRepository } from '../../../@domain/repository/repository/user.repository';
import { ModalComponent } from '../../@common-components/modal/modal.component';
import { User } from '../../../@data/model/User/user';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
})
export class UserRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  selectedItemType: any;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userRepository: UserRepository,
    private dialog: MatDialog
  ) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: [''],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      numTypeDocument: [''],
      typeDocument: [''],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
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

    this.userRepository.registerUser(data).subscribe(
      (value) => {
        this.dialog.open(ModalComponent, { data: { message: 'Success' } });
      },
      (error) => {
        this.dialog.open(ModalComponent, { data: { message: 'Error' } });
      }
    );
  }
}
