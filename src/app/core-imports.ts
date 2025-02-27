// src/app/core/core-imports.ts
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { AppServPillihuamanFooterHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-footer-home/app-serv-pillihuaman-footer-home.component';
import { ServPillihuamanSidebarHomeComponent } from './@presentation/@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { RouterOutlet } from '@angular/router';

export const CoreImports = [RouterOutlet,
  CommonModule,
  ReactiveFormsModule,
  NbButtonModule,
  NbDialogModule,
  NbInputModule,
    ServPillihuamanSidebarHomeComponent,  NbLayoutModule,
  NbSelectModule,NbIconModule,NbEvaIconsModule,MatIconModule,AppServPillihuamanFooterHomeComponent,ServPillihuamanSidebarHomeComponent
];
