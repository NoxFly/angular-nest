import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { GuestGuard } from 'src/app/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/views/dashboard/dashboard.routes').then(d => d.routes),
    },
    {
        path: 'auth/login',
        canActivate: [GuestGuard],
        loadComponent: () => import('src/app/views/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'auth/logout',
        canActivate: [AuthGuard],
        loadComponent: () => import('src/app/views/auth/logout/logout.component').then(m => m.LogoutComponent)
    },
];
