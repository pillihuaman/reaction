// src/app/core/core-providers.ts
import { ModalRepository } from './@domain/repository/repository/modal.repository ';
import { ModalService } from './@data/services/modal.service';

export const CoreProviders = [


  { provide: ModalRepository, useClass: ModalService }
  
];
