import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionManager } from 'src/app/core/tools/subscription-manager.directive';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent extends SubscriptionManager {
    public form: FormGroup;
    public errorMessage?: string;

    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) {
        super();

        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            remember: new FormControl(false),
        });
    }

    public onSubmit(): void {
        if(this.form.invalid) {
            return;
        }

        this.errorMessage = undefined;

        const { username, password, remember } = this.form.getRawValue();

        this.watch$ = this.authService.login$({ username, password, remember }).pipe(
            tap(() => this.onAfterLoginSuccessful()),
            catchError((error: HttpErrorResponse) => {
                this.onAfterLoginFailed(error);
                return throwError(() => error);
            })
        );
    }

    private onAfterLoginSuccessful(): void {
        this.errorMessage = undefined;
        this.router.navigateByUrl('/');
    }

    private onAfterLoginFailed(error: HttpErrorResponse): void {
        switch(error.status) {
            case 401:
                this.errorMessage = "Identifiants faux";
                break;
            case 500:
                this.errorMessage = "Une erreur est survenue";
                break;
            default:
                this.errorMessage = "Serveur injoignable";
        }
    }
}
