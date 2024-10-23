import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SubscriptionManager } from './core/tools/subscription-manager.directive';
import { AuthService } from './core/services/auth.service';
import { filter, map, tap } from 'rxjs';

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
        private readonly route: ActivatedRoute,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watch$ = this.auth.isAuthenticated$().pipe(
            map((isLoggedIn) => isLoggedIn ? '/dashboard/home' : '/auth/login'),
            filter((url) => url !== this.router.url),
            tap((url) => {
                console.log("current route", this.router.url, this.route.snapshot);
                console.info("AUTH STATE CHANGED, REDIRECTING TO", url);
                this.router.navigateByUrl(url);
            })
        );

        this.watch$ = this.auth.restore$();
    }
}
