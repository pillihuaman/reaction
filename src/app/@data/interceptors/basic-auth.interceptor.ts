import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { NbComponentStatus } from '@nebular/theme';
import { AuthenticationRepository } from '../../@domain/repository/repository/authentication.repository';
import { ModalRepository } from '../../@domain/repository/repository/modal.repository ';
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationRepository, private modalRepository: ModalRepository) {
    console.log('BasicAuthInterceptor interceptor...');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('BasicAuthInterceptor interceptor...');
    ////debugger
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (request.headers.get('Authorization') == null) {
      ////debugger
      const currentUser = this.authenticationService.getCurrentUserValue;
      if (currentUser && currentUser.accessToken) {
        headersConfig.Authorization = 'Bearer ' + `${currentUser.accessToken}`;
      }
      request = request.clone({ setHeaders: headersConfig });
    }
    return next.handle(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const nbComponentStatus: NbComponentStatus = 'danger';
        this.modalRepository.showToast(nbComponentStatus, error.message + "Basic","");
        return throwError(error);
      })
    );


  }
}
