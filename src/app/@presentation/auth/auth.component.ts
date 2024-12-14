import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbButtonModule, NbLayoutModule, NbSidebarService, NbThemeService } from '@nebular/theme';
import { ServPillihuamanHeaderHomeComponent } from '../@common-components/app-serv-pillihuaman-header-home/app-serv-pillihuaman-header-home.component';
import { ServPillihuamanSidebarHomeComponent } from '../@common-components/serv-pillihuaman-sidebar-home/serv-pillihuaman-sidebar-home.component';
import { CoreImports } from '../../core-imports';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NbLayoutModule,
    NbButtonModule,
    RouterOutlet,CoreImports
],
  providers: [NbSidebarService, NbThemeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthComponent implements OnInit {

  constructor(
    private sidebarService: NbSidebarService, 
    private nbThemeService: NbThemeService,private themeService: NbThemeService
  ) {}


  changeTheme() {

    const currentTheme = this.themeService.currentTheme;
    const newTheme = currentTheme === 'default' ? 'cosmic' : 'default';
    this.themeService.changeTheme(newTheme);
  }
  ngOnInit(): void {
    // Cambia el tema si es necesario
    this.nbThemeService.changeTheme('default');
  }

  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout(): void {
    this.sidebarService.collapse('menu-barapp');
  }
}