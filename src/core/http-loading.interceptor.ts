import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor( private toastr: ToastrService, private router: Router,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('_user')) {
      var token = JSON.parse(localStorage.getItem('_user') || '{}');

      const headers = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.token}`)
      });

      return next.handle(headers).pipe(
        catchError(error => {

          this.showMessages(error)

          return throwError(error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showMessages(error)
        
        return throwError(error);
      })
    );
  }

  showMessages(error: HttpErrorResponse) {
    if(error.status == 401){
      Object.keys(error.error).forEach(key => {
        this.toastr.error(error.error[key].message, 'Atención');
      })

      if(this.router.url != '/'){
        this.logOut();
      }

    }else if (error.status >= 400 && error.status < 500) {
      if(Array.isArray(error.error)){

      }else{
        Object.keys(error.error).forEach(key => {
          this.toastr.error(error.error[key], 'Atención');
        })
      }
    }else if (error.status >= 500 && error.status < 600) {
      this.toastr.error('A ocurrido un error, por favor comuniquese con el administrador', 'Atención');
    }
  }

  logOut(){
    localStorage.removeItem('_user');
    this.router.navigateByUrl('');
  }

}