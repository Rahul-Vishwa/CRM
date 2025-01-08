import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { LoaderService } from '../../../shared/services/loader-service/loader.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const loader=inject(LoaderService);
  loader.show();
  const apiUrl=environment.apiUrl;
  req=req.clone({
    url:`${apiUrl}${req.url}`
  })
  return next(req).pipe(
    finalize(()=>loader.hide())
  );
};
