import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { ApiService } from 'src/app/core/services/api.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public constructor(
        private readonly api: ApiService,
    ) {}

    public isAuthenticated$(): Observable<boolean> {
        return this.loginState.asObservable();
    }

    public isAuthenticated(): boolean {
        return this.loginState.getValue();
    }

    public restore$(): Observable<void> {
        return of(void 0).pipe(
            switchMap(() => this.api.check$()),
            map(() => this.setLoginState(true)),
            catchError(() => {
                this.setLoginState(false);
                return of(void 0);
            }),
        );
    }

    public login$(credentials: Credentials): Observable<void> {
        return this.api.login$(credentials).pipe(
            map((user) => {
                this.setLoginState(true);
            }),
        );
    }

    public logout$(): Observable<void> {
        return this.api.logout$().pipe(
            map(() => this.setLoginState(false))
        );
    }

    private setLoginState(isLoggedIn: boolean): void {
        // évite de mettre à jour le state si la valeur n'a pas changé
        // sinon peut provoquer une boucle infinie
        if(isLoggedIn !== this.loginState.getValue()) {
            this.loginState.next(isLoggedIn);
        }
    }
}
