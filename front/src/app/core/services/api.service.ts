import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { Bearer, JwtPayload } from 'src/app/core/models/bearer.type';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public constructor(
        private readonly http: HttpClient,
        @Inject('BACKEND_URL') private readonly backendUrl: string,
    ) {}

    /**
     * Le serveur web renvoie `true` si l'utilisateur est connecté, sinon throw sinon.
     */
    public check$(): Observable<boolean> {
        return this.http.post<boolean>(`${this.backendUrl}/auth/check`, {});
    }

    public getTokens$(): Observable<{ refreshToken: Bearer & JwtPayload; accessToken: Bearer & JwtPayload }> {
        return this.http.get<{ refreshToken: Bearer & JwtPayload; accessToken: Bearer & JwtPayload }>(`${this.backendUrl}/auth/tokens`).pipe(
            tap(({ accessToken, refreshToken }) => {
                console.log(new Date(refreshToken.iat * 1000), new Date(accessToken.expiresAt), new Date(refreshToken.expiresAt));
                localStorage.setItem('bearer_expires_in', accessToken.expiresAt.toString());
                localStorage.setItem('refresh_expires_in', refreshToken.expiresAt.toString());
                localStorage.setItem('bearer_start_time', (refreshToken.iat * 1000).toString());
            }),
        );
    }

    // ----

    public login$(credentials: Credentials): Observable<void> {
        return this.http.post<void>(`${this.backendUrl}/auth/login`, credentials);
    }

    public helloWorld$(): Observable<{ message: string; }> {
        return this.http.get<{ message: string; }>(`${this.backendUrl}/user/hello`);
    }
}
