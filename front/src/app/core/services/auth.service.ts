import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, catchError, forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { Maybe } from 'src/app/core/models/misc.type';
import { User } from 'src/app/core/models/user.type';
import { ApiService } from 'src/app/core/services/api.service';
import { RemoveUser, SetUser } from 'src/app/core/states/user.action';
import { UserState } from 'src/app/core/states/user.state';
import { encryptRSA } from 'src/app/shared/helpers/encryption';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginState = new BehaviorSubject<Maybe<boolean>>(null);

    public constructor(
        private readonly api: ApiService,
        private readonly store: Store,
        private readonly router: Router,
    ) {}

    public get isAuthenticated$(): Observable<Maybe<boolean>> {
        return this.loginState.asObservable();
    }

    public get isAuthenticated(): boolean {
        return this.loginState.getValue() === true;
    }

    /**
     * @description
     * Navigue vers la page par défaut de l'utilisateur non connecté.
     * La redirection efface la pile de navigation,
     * faisant de cette page la racine, donc pas de retour possible.
     */
    private navigateToDefaultGuestPage$(): Observable<void> {
        return from(this.router.navigateByUrl("/auth/login")).pipe(map(() => void 0));
    }

    /**
     * @description
     * Navigue vers la page par défaut de l'utilisateur connecté.
     * La redirection efface la pile de navigation,
     * faisant de cette page la racine, donc pas de retour possible.
     */
    private navigateToDefaultUserPage$(): Observable<void> {
        return from(this.router.navigateByUrl("/dashboard")).pipe(map(() => void 0));
    }

    public restore$(): Observable<void> {
        const cachedUser = this.store.selectSnapshot(UserState.user);

        if(!cachedUser) {
            this.loginState.next(false);
            return of(undefined);
        }

        return this.api.post$('auth/verify').pipe(
            switchMap(() => {
                this.loginState.next(true);
                return this.navigateToDefaultUserPage$();
            }),
            catchError(() => {
                return this.logout$();
            }),
        );
    }

    public login$(credentials: Credentials): Observable<void> {
        credentials.password = encryptRSA(credentials.password);

        return of(credentials).pipe(
            switchMap(creds => this.api.post$<User>('auth/login', creds)),
            switchMap(user => this.store.dispatch(new SetUser(user))),
            switchMap(() => {
                this.loginState.next(true);
                return this.navigateToDefaultUserPage$();
            }),
        );
    }

    public logout$(): Observable<void> {
        return forkJoin([
            this.api.post$('auth/logout'),
            of(this.loginState.next(false)),
        ]).pipe(
            switchMap(() => this.store.dispatch(new RemoveUser())),
            switchMap(() => this.navigateToDefaultGuestPage$()),
        );
    }
}
