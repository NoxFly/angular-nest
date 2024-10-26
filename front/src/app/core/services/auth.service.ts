import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { ApiService } from 'src/app/core/services/api.service';
import { RemoveUser, SetUser } from 'src/app/core/states/user.action';
import { UserState } from 'src/app/core/states/user.state';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly loginState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public constructor(
        private readonly api: ApiService,
        private readonly store: Store,
    ) {}

    public isAuthenticated$(): Observable<boolean> {
        return this.loginState.asObservable();
    }

    public isAuthenticated(): boolean {
        return this.loginState.getValue();
    }

    public restore$(): Observable<void> {
        return of(this.store.selectSnapshot(UserState.user)).pipe(
            map((user) => !!user),
            switchMap(ok => ok ? this.api.check$() : of(false)),
            map(ok => this.setLoginState(ok)),
        );
    }

    public login$(credentials: Credentials): Observable<void> {
        return this.api.login$(credentials).pipe(
            map((user) => {
                this.store.dispatch(new SetUser(user));
                this.setLoginState(true);
            }),
        );
    }

    public logout$(): Observable<void> {
        return this.api.logout$().pipe(
            map(() => {
                this.store.dispatch(new RemoveUser());
                this.setLoginState(false);
            }),
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
