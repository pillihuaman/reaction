import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthenticationService } from '../../@data/services/authentication.service';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { CoreProviders } from '../../core-providers';
import { ServPillihuamanHeaderHomeComponent } from '../@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { ServPillihuamanSidebarHomeComponent } from '../@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { CoreImportsModule } from '../../core-imports';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [CoreImportsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class PageComponent implements OnInit {
  constructor() { }
  isSidebarCollapsed = true;
  ngOnInit(): void {
    //his.sidebarService.collapse('menu-barapp'); // Asegura que el sidebar inicie colapsado
  }
  /*
    toggle(): boolean {
      //debugger
      if (this.isSidebarCollapsed) {
        this.sidebarService.expand('menu-barapp'); // Expand the sidebar if it's collapsed
      } else {
        this.sidebarService.collapse('menu-barapp'); // Collapse the sidebar if it's expanded
      }
  
      this.isSidebarCollapsed = !this.isSidebarCollapsed; // Toggle the state
      return false;
    }
  
    toggleout() {
      this.sidebarService.collapse('menu-barapp');
      this.isSidebarCollapsed = true; // Reset the state to collapsed
    }*/
}


