import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serv-pillihuaman-header-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './app-serv-pillihuaman-header-home.component.html',
  styleUrls: ['./app-serv-pillihuaman-header-home.component.scss']
})
export class ServPillihuamanHeaderHomeComponent implements OnInit {
  selectedTheme: string = 'default';
  listThemes = [
    { description: 'corporate', value: 0, position: 1 },
    { description: 'default', value: 1, position: 2 },
    { description: 'dark', value: 2, position: 3 },
    { description: 'cosmic', value: 3, position: 4 },
  ];

  constructor(private brakpointservice: BreakpointObserver, route: Router) {}

  ngOnInit(): void {}

  ChangeThemes(theme: string) {
    this.selectedTheme = theme;
  }
}
