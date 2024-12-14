import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDatepickerModule, NbDialogRef } from '@nebular/theme';
import { SpinnerService } from '../../../../../../@data/services/spinner.service';
import { SystemManagementComponent } from '../../system-management.component';
import { SystemService } from '../../../../../../@data/services/system.service';
import { CoreImports } from '../../../../../../core-imports';
import { TableDatasourceComponent } from '../../../../../@common-components/table-datasource/table-datasource.component';
@Component({
  selector: 'app-register-system',
  standalone: true,
  imports: [CoreImports,NbDatepickerModule,TableDatasourceComponent
  ],
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
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.systemForm = this.fb.group({
      name: ['', Validators.required],
      version: [''],
      timezone: [''],
      isActive: [false],
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
        alert('System saved successfully!');
        this.closeDialog();
        this.spinnerService.hide();
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