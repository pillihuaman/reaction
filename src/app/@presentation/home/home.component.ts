import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule, NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NbLayoutModule,    RouterOutlet], // Importa módulos standalone necesarios, como CommonModule para directivas comunes y NbLayoutModule para el layout de Nebular
  providers: [NbSidebarService, NbThemeService] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private sidebarService: NbSidebarService, private nbthemeservice: NbThemeService,) {
  }


  ngOnInit(): void {
    //this.nbthemeservice.changeTheme('neptuno');

  }


  toggle(): boolean {
    this.sidebarService.toggle(true, 'menu-barapp');
    return false;
  }

  toggleout() {
    this.sidebarService.collapse('menu-barapp');

  }

}
