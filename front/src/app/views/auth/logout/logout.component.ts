import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent extends SubscriptionManager implements OnInit {
    public constructor(
        private readonly auth: AuthService,
        private readonly router: Router,
    ) {
        super();
    }

    ngOnInit(): void {
        this.watch$ = this.auth.logout$().pipe(
            tap(() => {
                this.router.navigateByUrl('/');
            })
        );
    }
}
