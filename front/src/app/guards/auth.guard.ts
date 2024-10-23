import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if(!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/auth/login');
            return false;
        }

        return true;
    }
}
