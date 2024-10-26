import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials, LoginResponse } from 'src/app/core/models/api.type';

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
        return this.http.post<boolean>(`${this.backendUrl}/auth/check`, null);
    }

    // ----

    public login$(credentials: Credentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.backendUrl}/auth/login`, credentials);
    }

    public logout$(): Observable<void> {
        return this.http.post<void>(`${this.backendUrl}/auth/logout`, null);
    }
}
