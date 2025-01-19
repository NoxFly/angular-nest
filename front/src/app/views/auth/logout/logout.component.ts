import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionManager } from 'src/app/shared/directives/subscription-manager.directive';

@Component({
    standalone: true,
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.scss',
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent extends SubscriptionManager implements OnInit {
    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watch$ = this.auth.logout$().pipe(
            tap(() => {
                this.router.navigateByUrl('/');
            })
        );
    }
}
