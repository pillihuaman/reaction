import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ModalService } from '../services/modal.service';
import { NbComponentStatus } from '@nebular/theme';
import { CustomHttpErrorResponse } from '../model/general/CustomHttpErrorResponse';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ////debugger
    return next.handle(request).pipe(
      catchError((err: any) => {
        //debuger;
        let errc = err as CustomHttpErrorResponse;
        if (err instanceof HttpErrorResponse) {
          const httpError: HttpErrorResponse = err;

          // Handle specific status codes here
          if (httpError.status === 401) {
            // Handle Unauthorized (e.g., redirect to login)
          } else if (httpError.status === 500) {
            const nbComponentStatus: NbComponentStatus = 'danger';
            // Check if the response includes a specific structure for 500 errors
            if (err.error && err.error.status === 422 && err.error.data && err.error.data.payload) {
              // Extract the relevant information from the response
              const errorMessage = err.error.message;
              const payload = err.error.data.payload;

              // Customize your error handling based on the payload
              // For example, you can iterate through payload items and display relevant error messages
              if (payload.length > 0) {
                // const errorMessages = payload.map(item => item.propertyPath.leafNode.name);
                //this.modalService.showToast(nbComponentStatus, errorMessages.join(', '));
              } else {
                this.modalService.showToast(nbComponentStatus, errorMessage, "");
              }
            } else
              if (err.error.errors && err.error.errors.length > 0) {
                this.modalService.showToast(nbComponentStatus, err.error.errors[0], "");
              } else {
                this.modalService.showToast(nbComponentStatus, 'Internal Server Error', "");
              }

          }
      /*    else if (httpError.status === 422) {
            // Handle Internal Server Error
            const nbComponentStatus: NbComponentStatus = 'warning';
            this.modalService.showToast(nbComponentStatus, err.error.errors[0]);
          } */else if (httpError.status === 404) {
            // Handle Not Found
            const nbComponentStatus: NbComponentStatus = 'danger';
            this.modalService.showToast(nbComponentStatus, 'Resource Not Found', "");
          }
          else if (httpError.status === 400) {
            // Handle Not Found
            const nbComponentStatus: NbComponentStatus = 'danger';
                this.modalService.showToast(nbComponentStatus, 'Internal Server Error',httpError.error.detail);
          }
          // You can also re-throw the error to propagate it further
          return throwError(err);
        } else {
          // Handle non-HTTP errors (e.g., network errors)
          // const nbComponentStatus: NbComponentStatus = 'danger';
          //this.modalService.showToast(nbComponentStatus, 'Network Error');
          return throwError('Error');
        }
      })
    );
  }
}
