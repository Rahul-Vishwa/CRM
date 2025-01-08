import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../shared/services/toast-service/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService=inject(ToastService);
  return next(req)
    .pipe(
      catchError((err:HttpErrorResponse)=>{
        if (err.status===500){
          toastService.show('Server Not Responding.');
        }
        if (err.status==400){
          toastService.show(err.error);
        }
        return throwError(()=>err);
      })
    );
};
