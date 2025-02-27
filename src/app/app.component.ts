import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbLayoutModule, NbSidebarModule, NbButtonModule, NbThemeService, NbSidebarService, NbDatepickerModule } from '@nebular/theme';
import { ServPillihuamanSidebarHomeComponent } from './@presentation/@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { ServPillihuamanHeaderHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { AppServPillihuamanFooterHomeComponent } from './@presentation/@common-components/app-serv-pillihuaman-footer-home/app-serv-pillihuaman-footer-home.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreImports } from './core-imports';

@Component({
  selector: 'app-root',
  template: `<nb-layout><nb-layout-column>Contenido aquí</nb-layout-column></nb-layout>`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Habilita el alcance global para los estilos
  imports: [
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbSidebarModule,
    NbDatepickerModule, MatIconModule ,CoreImports,RouterOutlet,ServPillihuamanHeaderHomeComponent// Configuración del datepicker
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NbThemeService,NbSidebarService] // Agregar NbThemeService aquí en lugar de en imports

})
export class AppComponent {
  constructor(  private sidebarService: NbSidebarService,
    private nbthemeservice: NbThemeService) {

    
  }
  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {

    this.sidebarService.collapse('menu-barapp');
  }
}
