import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { apiInterceptor } from './core/interceptors/api/api.interceptor';
import { tokenInterceptor } from './core/interceptors/token/token.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { EMPTY } from 'rxjs';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { provideStore } from '@ngrx/store';
import { customersReducer, paginationReducer } from './features/store/customers.reducer';
import { provideEffects } from '@ngrx/effects';
import { CustomersEffect } from './features/store/customers.effect';

export function initAuth(){
  return ()=>(localStorage.getItem('token') ? inject(AuthService).getCurrentUser() : EMPTY);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor, apiInterceptor, errorInterceptor])),
    provideAppInitializer(initAuth()),
    provideStore({ customers: customersReducer, pagination:paginationReducer }),
    provideEffects(CustomersEffect)
]
};
