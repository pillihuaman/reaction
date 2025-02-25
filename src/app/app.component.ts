import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ServPillihuamanSidebarHomeComponent } from './@presentation/@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { ServPillihuamanHeaderHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { AppServPillihuamanFooterHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-footer-home/app-serv-pillihuaman-footer-home.component';
import { CoreImportsModule } from './core-imports';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CoreImportsModule,
    RouterOutlet,
    ServPillihuamanHeaderHomeComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  isSidebarOpen = false;

  toggleSidenav(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidenavOnClickOutside(): void {
    this.isSidebarOpen = false;
  }
}
