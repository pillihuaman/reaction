import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuLeft } from '../../../@data/model/general/menu-left';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-serv-pillihuaman-sidebar-home',
  templateUrl: './serv-pillihuaman-sidebar-home.component.html',
  styleUrls: ['./serv-pillihuaman-sidebar-home.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule,   
     ReactiveFormsModule,  // ✅ Importante para formularios reactivos
    MatFormFieldModule,   // ✅ Necesario para <mat-form-field>
    MatInputModule,       // ✅ Necesario para <input matInput>
    MatButtonModule  ]
})
export class ServPillihuamanSidebarHomeComponent implements OnInit {
  listMenuLeft: MenuLeft[] = [
    { idMenu: 1, description: 'Home', icono: 'home', iconClass: 'material-icons-outlined', url: '/' },
    { idMenu: 2, description: 'Video', icono: 'play_circle_outline', iconClass: 'material-icons-outlined', url: '/user' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
