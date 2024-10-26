import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/models/user.type';
import { UserState } from 'src/app/core/states/user.state';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ToastComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends SubscriptionManager implements OnInit {
    public user!: User;

    public constructor(
        private readonly router: Router,
        private readonly store: Store,
    ) {
        super();
    }

    public goToLogout(): void {
        this.router.navigateByUrl('/auth/logout');
    }

    public ngOnInit(): void {
        this.user = this.store.selectSnapshot(UserState.user)!;
    }
}
