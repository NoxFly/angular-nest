import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, ToastComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent extends SubscriptionManager implements OnInit, OnDestroy {
    public requestContent?: string;

    // DEV
    private bearerStartTime!: number;
    private bearerExpiresIn!: number;
    private refreshExpiresIn!: number;
    private now!: number;
    //
    private duration!: number;
    //
    public nowPerc!: number;
    public bearerPerc!: number;
    public refreshPerc!: number;
    //
    public progressBarColor: string = 'success';
    //
    private interval!: number;
    //

    public constructor(
        private readonly router: Router,
        private readonly api: ApiService,
    ) {
        super();
    }

    public helloWorld(): void {
        this.watch$ = this.api.helloWorld$().pipe(
            tap(response => {
                this.requestContent = response.message;

                setTimeout(() => {
                    this.requestContent = undefined;
                }, 1500);
            }),
            switchMap(() => this.api.getTokens$())
        );
    }

    public goToLogout(): void {
        this.router.navigateByUrl('/auth/logout');
    }

    private refreshTime(): void {
        this.bearerStartTime = +(localStorage.getItem('bearer_start_time') || 0);
        this.bearerExpiresIn = +(localStorage.getItem('bearer_expires_in') || 0);
        this.refreshExpiresIn = +(localStorage.getItem('refresh_expires_in') || 0);
        this.now = Date.now();

        const maxTime =  Math.max(this.refreshExpiresIn, this.bearerExpiresIn);

        this.duration = maxTime - this.bearerStartTime;
        this.nowPerc = Math.min((this.now - this.bearerStartTime) * 100 / this.duration, 100);
        this.bearerPerc = ((this.bearerExpiresIn - this.bearerStartTime) * 100 / this.duration);
        this.refreshPerc = ((this.refreshExpiresIn - this.bearerStartTime) * 100 / this.duration);

        if(this.nowPerc >= this.bearerPerc) {
            this.progressBarColor = 'warning';
        }
        else {
            this.progressBarColor = 'success';
        }

        if(this.now >= this.refreshExpiresIn) {
            this.progressBarColor = 'danger';
        }
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy();
        clearInterval(this.interval);
    }

    public ngOnInit(): void {
        this.interval = setInterval(() => this.refreshTime(), 10);
    }
}
