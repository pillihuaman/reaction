import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ServPillihuamanHeaderHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { ServPillihuamanSidebarHomeComponent } from './@presentation/@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { AppServPillihuamanFooterHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-footer-home/app-serv-pillihuaman-footer-home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet,MatFormFieldModule, // ✅ Importar MatFormFieldModule
    MatInputModule,     // ✅ Importar MatInputModule si usas <mat-form-field>
    MatButtonModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
  ]
})
export class CoreImportsModule {} // ✅ Convertido en un NgModule
