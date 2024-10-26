import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public constructor(
        private readonly authService: AuthService,
    ) {}

    public intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
        // Si le serveur web renvoie 401, alors
        // C'est que l'utilisateur n'est pas/plus connecté.
        // Dans ce cas, on le déconnecte.
        return this.checkRequest$(request).pipe(
            switchMap((req) => handler.handle(req)),
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401) {
                    return this.authService.logout$().pipe(
                        switchMap(() => throwError(() => error))
                    );
                }

                return throwError(() => error);
            }),
        );
    }

    private checkRequest$(req: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
        let headers = req.headers;

        const accessToken = this.authService.getToken();

        if(accessToken) {
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        const r = req.clone({
            withCredentials: true,
            headers,
        });

        return of(r);
    }
}
