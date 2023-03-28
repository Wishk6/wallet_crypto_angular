import {Injectable} from '@angular/core';
import {HttpEvent,HttpHandler,HttpInterceptor,HttpRequest} from '@angular/common/http';
import {catchError,Observable,retry,throwError} from 'rxjs';
import {tokenGetter} from "../app.module";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {
  }

  intercept(request: HttpRequest<unknown>,next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + tokenGetter()
      }
    });

    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log(error,"test",error.status)
        if (error.status === 401) {
          if (this.router.url !== '/login') {
            this.router.navigate(['/login']);
            return throwError(error);
          } else {
            this.toastr.error( error.message);
            return throwError(error);
          }
        }
        if (error.status === 403) {
          this.toastr.info(error.error.message);
          return throwError(error);
        }
        else {
          this.toastr.error(error.error.message);
          return throwError(error);
        }
      })
    );
  }
}
