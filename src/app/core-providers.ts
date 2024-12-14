// src/app/core/core-providers.ts
import { NbSidebarService, NbDialogService, NbDialogConfig } from '@nebular/theme';
import { ModalRepository } from './@domain/repository/repository/modal.repository ';
import { ModalService } from './@data/services/modal.service';

export const CoreProviders = [
  NbSidebarService,
  NbDialogService,
  {
    provide: NbDialogConfig,
    useValue: {
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      closeOnBackdropClick: true,
      closeOnEsc: true,
    },
  },

  { provide: ModalRepository, useClass: ModalService },
    {
      provide: NbDialogConfig,
      useValue: {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        closeOnBackdropClick: true,
        closeOnEsc: true,
      },
    },
];
