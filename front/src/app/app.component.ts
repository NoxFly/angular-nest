import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap, timeout } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen/loading-screen.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, LoadingScreenComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends SubscriptionManager implements OnInit {
    public isLoading: boolean = true;

    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef,
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

        this.watch$ = this.auth.restore$().pipe(
            tap(() => {
                this.isLoading = false;
                this.cdr.detectChanges();
            })
        );
    }
}
