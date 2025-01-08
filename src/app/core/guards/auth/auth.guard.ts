import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const authService=inject(AuthService);

  if (route.url.at(-1)?.path==="signin" || route.url.at(-1)?.path==="signup"){
    authService.showLogoutButton=false;
    return true;
  }
  authService.showLogoutButton=true;

  return inject(AuthService).isAuthenticated()
    .pipe(
      map(isauth=>{
        return isauth && true;
      }),
      catchError(()=>{
        router.navigate(['/signin'], {
          queryParams: { returnUrl: state.url }, 
        });
        return of(false);
      })
    );
};
