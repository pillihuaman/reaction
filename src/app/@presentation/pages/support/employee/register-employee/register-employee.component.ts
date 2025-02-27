import { DatePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbComponentStatus, NbDatepickerModule, NbDialogRef } from '@nebular/theme';

import { AuthenticationService } from '../../../../../@data/services/authentication.service';
import { AuthenticationRepository } from '../../../../../@domain/repository/repository/authentication.repository';
import { CoreImports } from '../../../../../core-imports';
import { CoreProviders } from '../../../../../core-providers';
import { SpinnerService } from '../../../../../@data/services/spinner.service';
import { ModalRepository } from '../../../../../@domain/repository/repository/modal.repository ';
import { SupportRepository } from '../../../../../@domain/repository/repository/support.repository';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { LocaleService } from '../../../../../@data/interceptors/LocaleService';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss'],
  standalone: true,
  imports: [CoreImports,    NbDatepickerModule,MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule
  ], 

  
  providers: [CoreProviders,
    { provide: AuthenticationRepository, useClass: AuthenticationService },
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterEmployeeComponent implements OnInit {
  @Input() employeRequestForm!: FormGroup;


  constructor(private fb: FormBuilder, private spinnerService: SpinnerService, private datePipe: DatePipe, private supportService: SupportRepository,
    private modalRepository: ModalRepository,   
    @Optional() protected dialogRef: NbDialogRef<RegisterEmployeeComponent> , private localeService: LocaleService // Optional injection

  ) { 
    this.employeRequestForm = this.fb.group({
      startDate: [null, Validators.required],
      finishDate: [null, Validators.required],
    });

    // Configuración inicial para establecer la localización
    this.localeService;
    
  }

  ngOnInit(): void {
    this.buildForm();
    window.addEventListener('keydown', this.handleEscKey.bind(this));

  }



  buildForm() {
    this.employeRequestForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: [''],
      startDate: [''],
      finishDate: [''],
      document: ['', Validators.required],
      typeDocument: [''],
      salaryHours: [''],
      idToFind: [''],
      nameToFind: [''],
      lastNameToFind: [''],
      documentToFind: [''],
    });
  }

  onSubmit() {
    //debugger
    if (this.employeRequestForm.invalid) {
      this.modalRepository.showToast('danger', 'Invalid form', 'Please check the fields.');
      return;
    }
  
    const startDate = new Date(this.employeRequestForm.value.startDate);
    const finishDate = new Date(this.employeRequestForm.value.finishDate);
  
    // Validación de fechas
    if (isNaN(startDate.getTime()) || isNaN(finishDate.getTime())) {
      this.modalRepository.showToast('danger', 'Invalid dates', 'Start or Finish Date is invalid.');
      return;
    }
    const startDateFormatted = new Date(this.employeRequestForm.value.startDate).toISOString();
    const finishDateFormatted = new Date(this.employeRequestForm.value.finishDate).toISOString();
  
  
    if (!startDateFormatted || !finishDateFormatted) {
      this.modalRepository.showToast('danger', 'Invalid dates', 'Start or Finish Date is invalid.');
      return;
    }
  
    const formValues = {
      ...this.employeRequestForm.value,
      startDate: startDateFormatted,
      finishDate: finishDateFormatted,
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
    ////debugger
    this.employeRequestForm.reset(); // Optional: reset form when closing modal
    if (this.dialogRef) {
      this.dialogRef.close(); // Close the dialog using the dialog reference
    }
  }

  handleEscKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
  this.closeDialog();
    }
  }

}