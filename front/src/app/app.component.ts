import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingScreenComponent } from 'src/app/shared/components/loading-screen/loading-screen.component';
import { SubscriptionManager } from 'src/app/shared/directives/subscription-manager.directive';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, LoadingScreenComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends SubscriptionManager implements OnInit {
    public ready: boolean = false;

    public constructor(
        private readonly auth: AuthService,
        private readonly cdr: ChangeDetectorRef,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.watch$ = this.auth.restore$().pipe(
            tap(() => setTimeout(() => {
                this.ready = true;
                this.cdr.markForCheck();
            }, 500))
        );
    }
}
