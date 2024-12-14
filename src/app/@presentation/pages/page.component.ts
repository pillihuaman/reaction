import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NbButtonModule, NbLayoutModule, NbSidebarService, NbThemeService } from '@nebular/theme';
import { AuthenticationService } from '../../@data/services/authentication.service';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { CoreImports } from '../../core-imports';
import { CoreProviders } from '../../core-providers';
import { ServPillihuamanHeaderHomeComponent } from '../@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { ServPillihuamanSidebarHomeComponent } from '../@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [CoreImports,   NbLayoutModule,
    NbButtonModule,
    MatIconModule,MatNativeDateModule
  ], // Asegúrate de que estos módulos estén aquí
  providers: [CoreProviders,NbSidebarService, NbThemeService,
    { provide: AuthenticationRepository, useClass: AuthenticationService },
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class PageComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService, private nbthemeservice: NbThemeService) {}

  ngOnInit(): void {
    this.sidebarService.collapse('menu-barapp'); // Asegura que el sidebar inicie colapsado
  }

  toggle(): boolean {
    debugger

    this.sidebarService.toggle(true, 'menu-barapp'); // Alterna entre colapsado y expandido
    return false;
  }

  toggleout()  {
debugger
    this.sidebarService.collapse('menu-barapp');
  }
}


