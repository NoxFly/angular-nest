import { CommonModule } from '@angular/common';
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
            tap(() => {
                this.errorMessage = undefined;
                this.router.navigateByUrl('/');
            }),
            catchError((error: unknown) => {
                this.errorMessage = "Identifiants faux";
                return throwError(() => error);
            })
        );
    }
}
