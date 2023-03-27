import {Injectable} from '@angular/core';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import {catchError,Observable,retry,throwError} from 'rxjs';
import {tokenGetter} from "../app.module";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + tokenGetter()
      }
    });

    return next.handle(request).pipe(
      // retry(1),
      catchError((error: any) => {
        if (error.status === 401) {
          if (this.router.url !== '/login') {
            this.router.navigate(['/login']);
            return throwError(error);
          } else {
            console.log('error 401');
            return throwError(error);
          }
        } else {
          return throwError(error);
        }
      })
    );
  }
}
