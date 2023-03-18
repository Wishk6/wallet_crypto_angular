import {Injectable} from '@angular/core';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import {catchError,Observable,retry,throwError} from 'rxjs';
import {tokenGetter} from "../app.module";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + tokenGetter()
      }
    });

    return next.handle(request).pipe(
      retry(1),
      catchError((error: any) => {
        if (error.status === 401) {
          // refresh token ou send un message d'erreur avec un toaster
          return throwError(error);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
