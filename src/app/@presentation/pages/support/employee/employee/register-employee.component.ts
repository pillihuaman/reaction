import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { LocaleService } from '../../../../../@data/interceptors/LocaleService';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss'],
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class RegisterEmployeeComponent implements OnInit {
  @Input() employeRequestForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private datePipe: DatePipe,
    private supportService: SupportRepository,
    private modalRepository: ModalRepository,
    @Optional() protected dialogRef: MatDialogRef<RegisterEmployeeComponent>,
    private localeService: LocaleService // Optional injection
  ) {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
    });
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.handleEscKey.bind(this));
  }

  onSubmit() {
    if (this.employeRequestForm.invalid) {
      this.modalRepository.showToast('danger', 'Invalid form', 'Please check the fields.');
      return;
    }

    const startDate = new Date(this.employeRequestForm.value.startDate);
    const finishDate = new Date(this.employeRequestForm.value.finishDate);

    if (isNaN(startDate.getTime()) || isNaN(finishDate.getTime())) {
      this.modalRepository.showToast('danger', 'Invalid dates', 'Start or Finish Date is invalid.');
      return;
    }

    const formValues = {
      ...this.employeRequestForm.value,
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString(),
    };

    this.spinnerService.show();
    this.supportService.saveEmployee(formValues).subscribe(
      () => {
        this.modalRepository.showToast('success', 'Save Successful', 'Employee has been saved.');
        this.employeRequestForm.reset();
        this.spinnerService.hide();
        this.closeDialog();
      },
      (error) => {
        this.handleErrors(error);
      }
    );
  }

  handleErrors(error: any) {
    this.spinnerService.hide();
    if (error.status === 422 || error.status === 500) {
      error?.error?.data?.payload?.forEach((errorItem: any) => {
        const controlName = errorItem.propertyPath;
        const errorMessage = errorItem.valExceptionDescription;
        this.employeRequestForm.get(controlName)?.setErrors({ customError: errorMessage });
      });
    } else {
      this.modalRepository.showToast('danger', 'Error', 'Something went wrong.');
    }
  }

  closeDialog() {
    this.employeRequestForm.reset();
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }
}
