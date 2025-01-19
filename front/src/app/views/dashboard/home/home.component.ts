import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { User } from 'src/app/core/models/user.type';
import { UserState } from 'src/app/core/states/user.state';
import { SubscriptionManager } from 'src/app/shared/directives/subscription-manager.directive';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends SubscriptionManager implements OnInit {
    public user!: User;

    public constructor(
        private readonly store: Store,
    ) {
        super();
    }

    public ngOnInit(): void {
        this.user = this.store.selectSnapshot(UserState.user)!;
    }
}
