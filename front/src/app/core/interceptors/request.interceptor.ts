import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    public intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        // Si le serveur web renvoie 401, alors
        // C'est que l'utilisateur n'est pas/plus connecté.
        // Dans ce cas, on le déconnecte.
        return this.prepareRequest$(req).pipe(
            switchMap((req) => handler.handle(req)),
            catchError((error: HttpErrorResponse) => this.handleError$(error)),
        );
    }

    private prepareRequest$(req: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
        const headers = req.headers
            .set("Content-Type", "application/json") // type de contenu donné par le client au serveur
            .set("Accept", "application/json"); // type de contenu de réponse accepté par le client

        // Ajout des headers nécessaires à chaque requête
        const r = req.clone({
            headers,
            withCredentials: true, // permet la transmission des cookies httpOnly
            responseType: "json",
        });

        return of(r);
    }

    private handleError$(error: HttpErrorResponse): Observable<never> {
        if(error.status === 401) {
            return this.authService.logout$().pipe(
                switchMap(() => throwError(() => error))
            );
        }

        return throwError(() => error);
    }
}
