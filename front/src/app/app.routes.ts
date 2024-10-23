import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.routes').then(d => d.routes),
    },
    {
        path: 'auth/login',
        canActivate: [GuestGuard],
        loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'auth/logout',
        canActivate: [AuthGuard],
        loadComponent: () => import('./views/auth/logout/logout.component').then(m => m.LogoutComponent)
    },
];
