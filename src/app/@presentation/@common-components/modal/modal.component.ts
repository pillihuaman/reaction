import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [MatDialogModule,   MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatSidenavModule,CommonModule,
        MatListModule,], // Asegúrate de importar esto

  
})
export class ModalComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Input() rowData: any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rowData = data;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  deleteInformation(): void {
    this.deleteConfirmed.emit();
    this.dialogRef.close();
  }
}
