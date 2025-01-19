import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.auth.isAuthenticated$.pipe(
            filter((isAuthenticated) => isAuthenticated !== null),
            map((isAuthenticated: boolean) => {
                if(isAuthenticated) {
                    this.router.navigate(['/dashboard']);
                }

                return !isAuthenticated;
            }),
        );
    }
}
