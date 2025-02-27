import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreeNode } from '../../../../@data/model/general/treeNode';
import { SpinnerService } from '../../../../@data/services/spinner.service';
import { SystemService } from '../../../../@data/services/system.service';
import { NbDatepickerModule, NbDialogService } from '@nebular/theme';
import { CoreImports } from '../../../../core-imports';
import { TableDatasourceComponent } from '../../../@common-components/table-datasource/table-datasource.component';
import { BaseImplementation } from '../../../../utils/baseImplementation';
import { version } from 'moment';
import { SystemRequest } from '../../../../@data/model/general/systemRequest';
import { GeneralConstans } from '../../../../utils/generalConstant';
import { RegisterEmployeeComponent } from '../employee/register-employee/register-employee.component';
import { RegisterSystemComponent } from './register-system/register-system/register-system.component';
import { SystemResponse } from '../../../../@data/model/general/systemResponse';
import { map } from 'rxjs';

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
  
  columnMappin(): { [key: string]: string } {
    return {
      id: 'ID',
      name: 'Name',
      version: 'Versión',
      timezone: 'Time Zone',
      isActive: 'Is Activo'

    };

  }
  hasMorePagesT: boolean = true;
  searchButtonDisabled: boolean = true;
   filters: Partial<SystemRequest> = {};
  constructor(
    private fb: FormBuilder,
    private systemService: SystemService,
    private spinnerService: SpinnerService,  private dialogService: NbDialogService,
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

    onNewClick(): void {
      this.dialogService.open(RegisterSystemComponent, {
        context: {
          // Puedes pasar datos al modal aquí
        },
        closeOnBackdropClick: false,
        hasBackdrop: true,
        backdropClass: 'custom-backdrop',
        dialogClass: 'custom-dialog-centered',
      }).onClose.subscribe(result => {
        console.log('Modal cerrado con resultado:', result);
      });
    }

    findSystems(): void {
      // Mostrar el spinner mientras se realiza la búsqueda
      this.spinnerService.show();
    
      // Obtener valores de los campos del formulario
      const id = this.systemForm.get('idToFind')?.value || '';
      const name = this.systemForm.get('nameToFind')?.value || '';
      const version = this.systemForm.get('versionToFind')?.value || '';
      const timezone = this.systemForm.get('timezoneToFind')?.value || '';
    
      // Realizar la búsqueda utilizando el servicio
      this.systemService
        .searchSystems({ name, version, timezone }, this.page, this.pageSize)
        .pipe(
                map((response) => {
                  //debugger
            const respo: SystemResponse[] = response.payload;
            // Personalizar los nombres de las propiedades según el mapeo definido
            return this.customizePropertyNames(respo, this.columnMappin());
          })
        )
        .subscribe(
          (data) => {
            // Actualizar los datos con la respuesta recibida
            this.datas = data;
            console.log("Datos actualizados:", this.datas);
    
            // Si hay datos, establecer las columnas predeterminadas y permitir paginación
            if (this.datas && this.datas.length > 0) {
              console.log("Columnas disponibles:", Object.keys(this.datas[0].data));
              this.defaultColumnsInput = Object.keys(this.datas[0].data);
              this.updateHasMorePagesT(true);
            } else {
              this.updateHasMorePagesT(false);
            }
    
            // Ocultar el spinner después de completar la búsqueda
            this.spinnerService.hide();
          },
          (error) => {
            // Manejar errores y establecer errores personalizados en los controles si es necesario
            if ((error.status === 422 || error.status === 500) && error.error && error.error.data && error.error.data.payload) {
              error.error.data.payload.forEach((errorItem: any) => {
                const controlName = errorItem.propertyPath;
                const errorMessage = errorItem.valExceptionDescription;
                this.systemForm.get(controlName)?.setErrors({ invalid: true, customError: errorMessage });
              });
            }
    
            // Ocultar el spinner incluso en caso de error
            this.spinnerService.hide();
            console.error("Error al buscar sistemas:", error);
          }
        );
    }
    
    updateHasMorePagesT(value: boolean): void {
      this.hasMorePagesT = value;
     // this.hasMorePagesT = value;
      //this.hasMorePagesTChange.emit(this.hasMorePagesT);
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
