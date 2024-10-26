import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/core/models/api.type';
import { User } from 'src/app/core/models/user.type';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public constructor(
        private readonly http: HttpClient,
        @Inject('BACKEND_URL') private readonly backendUrl: string,
    ) {}

    // Authentification

    /**
     * Demande au backend de vérifier les credentials et de stocker les tokens
     * dans les cookies.
     */
    public login$(credentials: Credentials): Observable<User> {
        return this.http.post<User>(`${this.backendUrl}/auth/login`, credentials);
    }

    /**
     * Demande au backend de supprimer les cookies de bearer/refresh
     */
    public logout$(): Observable<void> {
        return this.http.post<void>(`${this.backendUrl}/auth/logout`, null);
    }

    /**
     * Le serveur web renvoie `true` si l'utilisateur est connecté, sinon throw.
     */
    public check$(): Observable<boolean> {
        return this.http.post<boolean>(`${this.backendUrl}/auth/check`, null);
    }
}
