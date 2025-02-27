import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NbComponentStatus } from '@nebular/theme';
import { catchError, throwError } from 'rxjs';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';

export const MyHttpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectar serviciosdebu
  ////debugger
  const authenticationService = inject(AuthenticationRepository);
  const modalRepository = inject(ModalRepository);

  // Configurar encabezados predeterminados
  let updatedHeaders = req.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');

  // Agregar el token Bearer si está disponible
  if (!req.headers.has('Authorization')) {
    const currentUser = authenticationService.getCurrentUserValue;
    if (currentUser?.accessToken) {
      updatedHeaders = updatedHeaders.set(
        'Authorization',
        `Bearer ${currentUser.accessToken}`
      );
    }
  }

  // Clonar la solicitud con los nuevos encabezados
  const clonedRequest = req.clone({ headers: updatedHeaders });

  // Manejar la solicitud y errores
  return next(clonedRequest).pipe(
    catchError((error) => {
      const status: NbComponentStatus = 'danger';
      modalRepository.showToast(status, `Error: ${error.message} (MyHttpInterceptor)`, '');
      return throwError(() => error);
    })
  );
};