import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

import { map, catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private router: Router, private auth: AuthService) { }

  // private handleAuthError(err: HttpErrorResponse): Observable<any> {
  //   //handle your auth error or rethrow
  //   if (err.status === 401 || err.status === 403) {
  //     //navigate /delete cookies or whatever
  //     this.router.navigateByUrl(`/login`);
  //     // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
  //     return null; // or EMPTY may be appropriate here
  //   }
  //   // return throwError(err);
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (req.url.startsWith("/api") && token) {
      const apiReq = req.clone({
        url: environment.apiUrl + req.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // return next.handle(apiReq);
      return next.handle(apiReq).
        pipe(
          catchError((error: HttpErrorResponse) => {
            if (!req.url.endsWith("getTokenByPassword")) {
              if (error.status == 403 || error.status == 401) {
                this.auth.logOut();
              }
            } else {
              console.log(error);
            }
            return throwError(error);
          })

        );
    }

    return next.handle(req);
  }
  
}
