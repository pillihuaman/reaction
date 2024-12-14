import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbThemeService } from '@nebular/theme';
import { MenuLeft } from '../../../@data/model/general/menu-left';

@Component({
  selector: 'app-serv-pillihuaman-sidebar-home',
  standalone: true,
  imports: [MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NbThemeModule,  // Solo este necesita `forRoot`
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbEvaIconsModule
  ],
  templateUrl: './serv-pillihuaman-sidebar-home.component.html',
  styleUrl: './serv-pillihuaman-sidebar-home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NbSidebarService]
})
export class ServPillihuamanSidebarHomeComponent  implements OnInit {



  listMenuLeft: MenuLeft[] = [];
  constructor() {

    let menuLeft: MenuLeft = {
      idMenu: 1,
      description: 'Home',
      icono: 'house',
      iconClass: 'material-icons-outlined',
      url: '/'
    }

    let menuLeft1: MenuLeft = {
      idMenu: 2,
      description: 'Video',
      icono: 'play_circle_outline',
      iconClass: 'material-icons-outlined',
      url: '/user'
    }
    this.listMenuLeft.push(menuLeft);
    this.listMenuLeft.push(menuLeft1);

  }

  ngOnInit(): void {
  }

  HideMenu(): void {

  }

}
