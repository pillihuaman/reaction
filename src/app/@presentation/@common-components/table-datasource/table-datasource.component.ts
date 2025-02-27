
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { NbDatepickerModule, NbIconModule, NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridModule } from '@nebular/theme';
import { debounce, debounceTime } from 'rxjs';
import { GeneralConstans } from '../../../utils/generalConstant';
import { AuthenticationService } from '../../../@data/services/authentication.service';
import { AuthenticationRepository } from '../../../@domain/repository/repository/authentication.repository';
import { CoreImports } from '../../../core-imports';
import { CoreProviders } from '../../../core-providers';
import { NbEvaIconsModule } from '@nebular/eva-icons';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}
interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}
@Component({
  selector: 'app-table-datasource',
  templateUrl: './table-datasource.component.html',
  styleUrls: ['./table-datasource.component.scss'],
  standalone: true,
  imports: [CoreImports, NbDatepickerModule, NbTreeGridModule, NbEvaIconsModule, NbIconModule

  ], // Asegúrate de que estos módulos estén aquí
  providers: [CoreProviders,
    { provide: AuthenticationRepository, useClass: AuthenticationService },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class TableDatasourceComponent implements OnInit {

  initialData: TreeNode<FSEntry>[] = []

  @Input() defaultColumns: any = [];// = [ 'size', 'kind', 'items' ];
  @Input() datas: any;
  allColumns = ['acciones', ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<any>;
  sortColumn?: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  pageSize = GeneralConstans.pageSizeTable;
  currentPage = GeneralConstans.currentPageTable;
  paginator = 1;
  paginatedData: TreeNode<any>[] = [];
  //initialData: any[] = []; // Initial 350 rows
  additionalData: any[] = []; // Dynamically added rows
  @Input() typeOfSearch?: String;
  showTable = false;
  showTableCustom = false;
  defaultColumnsBySearchType: any = [];
  datasBySearchType: any;
  @Input() isdelelete: any;
  @Output() dataChange: EventEmitter<TreeNode<any>[]> = new EventEmitter<TreeNode<any>[]>(); // Emits updated data
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.datas = [...this.initialData, ...this.additionalData];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.filteredDataSource = this.datas;

  }
  @Input()
  set tableData(data: any[]) {
    this.datas = data;
    this.buildTable();
  }
  @Output() deleteAction: EventEmitter<TreeNode<any>> = new EventEmitter<TreeNode<any>>();
  @Output() editAction = new EventEmitter<TreeNode<any>>();
  @Input() hasMorePages: boolean = true;  // Recibe si hay más páginas
  searchTerm: string = ''; // Variable for search input
  filteredDataSource: any[] = [];  // Filtered data
  ngOnInit(): void {
    //debugger
    this.datas = [...this.initialData];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.filteredDataSource = this.datas;
    this.buildTable();
    // You can leave it empty or remove it entirely
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customColumn'] || changes['defaultColumns'] || changes['datas']) {
      this.allColumns = [...this.defaultColumns];
      if (!changes['datas'].isFirstChange()) {
        if (
          changes['datas'].currentValue &&
          changes['datas'].currentValue !== null &&
          changes['datas'].currentValue !== undefined &&
          changes['datas'].currentValue.length > 0
        ) {
          //debugger


          this.showTableCustom = false;
          this.showTable = true;
          ////debugger
          if (this.isdelelete !== undefined) {
            if (this.isdelelete.data === undefined) {
              this.additionalData = [...changes['datas'].currentValue];
            } else {
              this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];

            }
          } else {
            this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
          }
          this.datas = [...this.initialData, ...this.additionalData];
          this.dataSource = this.dataSourceBuilder.create(this.datas);
          this.buildTable();

        } else {
          this.hasMorePages = false;
          if (this.typeOfSearch === GeneralConstans.typeSearchDefault) {
            this.showTableCustom = false;
            this.showTable = true;
            this.additionalData = [...this.additionalData, ...changes['datas'].currentValue];
            this.datas = [...this.initialData, ...this.additionalData];
            this.dataSource = this.dataSourceBuilder.create(this.datas);
            this.buildTable();


          } else {
            this.defaultColumnsBySearchType = this.defaultColumns
            this.datasBySearchType = this.datas;
            this.resetTable()
          }
        }
      }
    } else {
      ////debugger


      if (this.isdelelete && this.isdelelete.data && this.isdelelete.data.ID !== undefined) {
        this.deleteItem();
      }


    }
  }

  deleteItem(): void {
    const id: string = this.isdelelete.data.ID;

    // Filter the list to remove the item with the given ID
    this.datas = this.datas.filter((dataItem: { data: { ID: any } }) => dataItem.data.ID !== id);
    this.dataChange.emit(this.datas);
    // Update the dataSource with the new data
    this.dataSource = this.dataSourceBuilder.create(this.datas);

    // Rebuild the table
    this.buildTable();

    // Emit the updated data to other components or services

  }


  resetTable(): void {
    this.initialData = [];
    this.additionalData = [];
    this.dataSource = this.dataSourceBuilder.create(this.datas);
    this.buildTable();

  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  onEdit(row: TreeNode<any>): void {
    ;
    // Implement your edit logic here
    console.log('Edit:', row.data);
    this.editAction.emit(row);
    // Add your edit logic here, for example, open a modal or navigate to an edit page
  }

  buildTable() {

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.datas.slice(startIndex, endIndex);
    this.dataSource = this.dataSourceBuilder.create(this.paginatedData);

  }
  onPageChange(page: any): void {
    //debugger
    if (this.hasMorePagest()) {
      this.currentPage = page;
      this.buildTable();
      this.hasMorePages = true;
    }
    else {
      this.paginator++;
      this.pageChange.emit(this.paginator);
      this.currentPage = page;
      //this.hasMorePages = false;
    }

  }
  onPageChangeBack(page: number): void {
    this.hasMorePages = true;
    this.currentPage = page;
    this.buildTable();


  }

  hasMorePagest(): boolean {
    const totalItems = this.datas.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return this.currentPage < totalPages;
  }
  onDelete(row: TreeNode<FSEntry>): void {
    ;
    // Emit the delete action to the parent component
    this.deleteAction.emit(row);
  }

  getHeaderColumns(): string[] {
    return [...this.defaultColumns, 'acciones',];
  }

  getRowColumns(): string[] {
    return [...this.defaultColumns, 'acciones',];
  }

  handleDeleteAction(row: TreeNode<FSEntry>): void {
    // Perform the delete action here
    console.log('Deleting information from parent:', row.data);
    this.deleteAction.emit(row);
    // Implement your deletion logic
  }
  onItemDeleted(item: TreeNode<any>): void {
    // Filtrar el ítem eliminado de la lista
    this.datas = this.datas.filter((dataItem: { data: { ID: any; }; }) => dataItem.data.ID !== item.data.ID);

    // Volver a construir la tabla con la lista actualizada
    this.buildTable();
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  
}
