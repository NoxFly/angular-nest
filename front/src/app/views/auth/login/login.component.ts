import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { AuthService } from 'src/app/core/services/auth.service';
import { SubscriptionManager } from 'src/app/shared/directives/subscription-manager.directive';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends SubscriptionManager {
    public form: FormGroup;
    public errorMessage?: string;
    public isTrying: boolean = false;

    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef,
    ) {
        super();

        this.form = new FormGroup({
            username: new FormControl('admin', [Validators.required, Validators.maxLength(50)]),
            password: new FormControl('test', [Validators.required, Validators.maxLength(50)]),
            remember: new FormControl(false),
        });
    }

    public get cannotTryToLogin(): boolean {
        return this.form.invalid || this.isTrying;
    }

    public onSubmit(): void {
        if(this.cannotTryToLogin) {
            return;
        }

        this.errorMessage = undefined;
        this.isTrying = true;

        const { username, password, remember } = this.form.getRawValue();
        const credentials: Credentials = { username, password, remember };

        this.watch$ = this.authService.login$(credentials).pipe(
            tap(() => {
                this.errorMessage = undefined;
                this.router.navigateByUrl('/');
            }),
            catchError((error: unknown) => {
                this.errorMessage = "Identifiants faux";
                this.isTrying = false;
                return throwError(() => error);
            }),
            finalize(() => {
                this.cdr.markForCheck();
            }),
        );
    }
}
