import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import {catchError} from 'rxjs/operators';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let url: String = this.router.routerState.snapshot.url;

      if (req.headers.get('No-Auth') == "True") {

          return next.handle(req.clone());
      }
      
        

          
      if (localStorage.length > 0) {


        req = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + localStorage.getItem('userToken')
          }
        });
        
        return next.handle(req).pipe(
            catchError(err => {

              if (err instanceof HttpErrorResponse && err.status === 0) {
                console.log('Check Your Internet Connection And Try again Later');
              } 
              else if (err instanceof HttpErrorResponse && err.status === 401) {
                localStorage.clear();
                this.router.navigate(['/login']);

              }

              return throwError(err);
            })
            );
              
      }
      else {
        
        this.router.navigate(['/login']);

        return next.handle(req.clone());
      }
    }
}