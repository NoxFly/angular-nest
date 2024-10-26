import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { ApiService } from './api.service';
import { Bearer } from 'src/app/core/models/bearer.type';
import { parseJson } from 'src/app/core/tools/utils';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private bearerToken: Bearer | null = null;

    public constructor(
        private readonly api: ApiService,
    ) {}

    public isAuthenticated$(): Observable<boolean> {
        return this.loginState.asObservable();
    }

    public isAuthenticated(): boolean {
        return this.loginState.getValue();
    }

    public getToken(): string | undefined {
        return this.bearerToken?.access_token;
    }

    public restore$(): Observable<void> {
        return of(localStorage.getItem('bearer')).pipe(
            map((bearer) => bearer ? parseJson<Bearer>(bearer) : null),
            switchMap((bearer) => {
                this.bearerToken = bearer;

                if(bearer) {
                    return this.api.check$();
                }

                return throwError(() => null);
            }),
            map(() => {
                this.setLoginState(true);
                return void 0;
            }),
            catchError(() => of(this.onLogout())),
        );
    }

    public login$(credentials: Credentials): Observable<void> {
        return this.api.login$(credentials).pipe(
            tap((res) => {
                this.bearerToken = {
                    access_token: res.access_token,
                    expiresAt: 0,
                    expiresIn: 0,
                };

                // store token in local storage
                localStorage.setItem('bearer', JSON.stringify(this.bearerToken));
            }),
            map(() => this.setLoginState(true)),
        );
    }

    public logout$(): Observable<void> {
        return this.api.logout$().pipe(
            finalize(() => this.onLogout())
        );
    }

    private setLoginState(isLoggedIn: boolean): void {
        if(isLoggedIn !== this.loginState.getValue()) {
            this.loginState.next(isLoggedIn);
        }
    }

    private onLogout(): void {
        this.bearerToken = null;
        localStorage.removeItem('bearer');
        this.setLoginState(false);
    }
}
