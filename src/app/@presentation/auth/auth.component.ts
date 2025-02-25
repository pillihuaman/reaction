import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreImportsModule } from '../../core-imports';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet, CoreImportsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthComponent{
  isSidebarOpen = false;

  toggleSidenav(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidenavOnClickOutside(): void {
    this.isSidebarOpen = false;
  }
}
