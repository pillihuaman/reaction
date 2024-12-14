import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { AuthenticationService } from '../../../@data/services/authentication.service';
import { AuthenticationRepository } from '../../../@domain/repository/repository/authentication.repository';
import { CoreImports } from '../../../core-imports';
import { CoreProviders } from '../../../core-providers';


@Component({
  selector: 'app-appspinnercard',
  templateUrl: './appspinnercard.component.html',
  styleUrls: ['./appspinnercard.component.scss'],
  standalone: true,
  imports: [CoreImports,NbCardModule
  ], 
  providers: [CoreProviders,
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppspinnercardComponent  {

}
