import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDatepickerModule, NbDialogRef } from '@nebular/theme';
import { SpinnerService } from '../../../../../../@data/services/spinner.service';
import { SystemManagementComponent } from '../../system-management.component';
import { SystemService } from '../../../../../../@data/services/system.service';
import { CoreImports } from '../../../../../../core-imports';
import { ModalRepository } from '../../../../../../@domain/repository/repository/modal.repository ';
@Component({
  selector: 'app-register-system',
  standalone: true,
  imports: [CoreImports,NbDatepickerModule,  ],
  templateUrl: './register-system.component.html',
  styleUrl: './register-system.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterSystemComponent implements OnInit {
  systemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: NbDialogRef<SystemManagementComponent>,
    private spinnerService: SpinnerService,
    private systemService: SystemService,   private modalRepository: ModalRepository,  
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.systemForm = this.fb.group({
      name: ['', Validators.required],
      version: [''],
      timezone: [''],
      contactEmail: ['', [Validators.email]],
      supportPhone: [''],
    });
  }

  onSubmit(): void {
    if (this.systemForm.invalid) {
      alert('Form is invalid. Please check the fields.');
      return;
    }

    this.spinnerService.show();
    const systemData = this.systemForm.value;

    this.systemService.saveSystem(systemData).subscribe(
      (response) => {
        this.modalRepository.showToast('success', 'Save Successful', 'Employee has been saved.');
        this.systemForm.reset();
        this.spinnerService.hide();
        this.closeDialog();
      },
      (error) => {
        console.error('Error saving system:', error);
        alert('An error occurred. Please try again later.');
        this.spinnerService.hide();
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}