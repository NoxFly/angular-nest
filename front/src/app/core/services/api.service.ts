import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from 'src/app/core/models/api.type';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public constructor(
        private readonly http: HttpClient,
        @Inject('BACKEND_URL') private readonly backendUrl: string,
    ) {}

    public get$<T>(url: string, query?: Query): Observable<T> {
        return this.http.get<T>(this.backendUrl + url, { params: query });
    }

    public post$<T>(url: string, body?: unknown, query?: Query): Observable<T> {
        return this.http.post<T>(this.backendUrl + url, body, { params: query });
    }

    public put$<T>(url: string, body?: unknown, query?: Query): Observable<T> {
        return this.http.put<T>(this.backendUrl + url, body, { params: query });
    }

    public patch$<T>(url: string, body?: unknown, query?: Query): Observable<T> {
        return this.http.patch<T>(this.backendUrl + url, body, { params: query });
    }

    public delete$<T>(url: string): Observable<T> {
        return this.http.delete<T>(this.backendUrl + url);
    }
}
