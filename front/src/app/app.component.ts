import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { SubscriptionManager } from './core/tools/subscription-manager.directive';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent extends SubscriptionManager implements OnInit {
    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watch$ = this.auth.isAuthenticated$().pipe(
            map((isLoggedIn) => isLoggedIn ? '/dashboard/home' : '/auth/login'),
            filter((url) => url !== this.router.url),
            tap((url) => {
                this.router.navigateByUrl(url);
            })
        );

        this.watch$ = this.auth.restore$();
    }
}
