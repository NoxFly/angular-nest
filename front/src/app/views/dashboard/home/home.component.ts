import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ToastComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent extends SubscriptionManager {
    public requestContent?: string;

    public constructor(
        private readonly router: Router,
    ) {
        super();
    }

    public goToLogout(): void {
        this.router.navigateByUrl('/auth/logout');
    }
}
