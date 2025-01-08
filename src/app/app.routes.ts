import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path:"", 
        redirectTo:"signin",
        pathMatch:"full"
    },
    {
        path:"signup", 
        loadComponent:
            ()=>import("./features/auth/auth.component")
            .then((m)=>m.AuthComponent),
        canActivate:[authGuard]
    },
    {
        path:"signin", 
        loadComponent:
            ()=>import("./features/auth/auth.component")
            .then((m)=>m.AuthComponent),
        canActivate:[authGuard]
    },
    {
        path:"home", 
        loadComponent:
            ()=>import("./core/components/home/home.component")
            .then((m)=>m.HomeComponent),
        canActivate:[authGuard]
    },
];
