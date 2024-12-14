import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { SystemService } from '../../../../@data/services/system.service';
import { NbDatepickerModule } from '@nebular/theme';
import { CoreImports } from '../../../../core-imports';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';

@Component({
  selector: 'app-system-management',
  standalone: true,
  imports: [CoreImports,NbDatepickerModule,TableDatasourceComponent
  ],
  templateUrl: './system-management.component.html',
  styleUrl: './system-management.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SystemManagementComponent extends BaseImplementation implements OnInit {
  systemForm!: FormGroup;
  datas?: TreeNode<any>[] = [];
  defaultColumnsInput: string[] = ['id', 'name', 'version', 'timezone', 'isActive'];
  typeOfSearch: string = 'default';
  searchButtonDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private spinnerService: SpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.findSystems();
  }

  buildForm(): void {
    this.systemForm = this.fb.group({
      name: ['', Validators.required],
      version: [''],
      timezone: [''],
      isActive: [false],
    });

    this.systemForm.valueChanges.subscribe(() => {
      this.searchButtonDisabled = !this.systemForm.valid;
    });
  }

  findSystems(): void {
    const { name, version, timezone, isActive } = this.systemForm.value;
    this.spinnerService.show();
    this.systemService.searchSystems({ name, version, timezone, isActive }).subscribe(
      (data) => {
       // this.datas = data;
        this.spinnerService.hide();
      },
      (error) => {
        console.error('Error fetching systems:', error);
        this.spinnerService.hide();
      }
    );
  }

  deleteSystem(row: TreeNode<any>): void {
    const systemId = row.data.id;
    this.systemService.deleteSystem(systemId).subscribe(() => {
      this.datas = this.datas?.filter((item) => item.data.id !== systemId);
    });
  }

  editSystem(row: TreeNode<any>): void {
    const system = row.data;
    this.systemForm.patchValue(system);
  }

  resetForm(): void {
    this.systemForm.reset();
    this.findSystems();
  }
  closeDialog(){}

  
}
