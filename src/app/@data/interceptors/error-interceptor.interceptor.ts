import { HttpInterceptorFn } from '@angular/common/http';

export const ErrorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('errorInterceptorInterceptor interceptor...');
  return next(req);
};
