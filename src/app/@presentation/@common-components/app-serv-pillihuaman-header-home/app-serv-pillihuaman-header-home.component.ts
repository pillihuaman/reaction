import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconConfig, NbIconModule, NbLayoutModule, NbLayoutRulerService, NbSelectModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { CommonModule } from '@angular/common';  // <-- Add this import

@Component({
  selector: 'app-serv-pillihuaman-header-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NbThemeModule,  // Solo este necesita `forRoot`
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    MatIconModule,
    MatNativeDateModule,
    NbSelectModule,
    CommonModule  // <-- Add CommonModule here
  ],
  templateUrl: './app-serv-pillihuaman-header-home.component.html',
  styleUrls: ['./app-serv-pillihuaman-header-home.component.scss']
})
export class ServPillihuamanHeaderHomeComponent implements OnInit {
  contadoTaggle: number = 1;
  listThemes: any[] = [
    { description: 'corporate', value: 0, position: 1 },
    { description: 'default', value: 1, position: 2 },
    { description: 'dark', value: 2, position: 3 },
    { description: 'cosmic', value: 3, position: 4 },
  ];
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  disabledIconConfig: NbIconConfig = { icon: 'settings-2-outline', pack: 'eva' };

  constructor(
    private nbserviceThemes: NbThemeService,
    private sidebarService: NbSidebarService,
    private brakpointservice: BreakpointObserver,
    route: Router,
    private layoutService: NbLayoutRulerService
  ) { }

  ngOnInit(): void {}

  ChangeThemes(event: any) {
    this.nbserviceThemes.changeTheme(event);
  }

  home() {}

  toggle() {
    this.sidebarService.toggle(true, 'menu-barapp');
    console.log(this.layoutService.getDimensions());
    return false;
  }
}
