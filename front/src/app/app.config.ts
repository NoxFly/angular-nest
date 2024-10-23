import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({
            eventCoalescing: true
        }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),

        // DI constants
        { provide: 'BACKEND_URL', useValue: environment.backend.url },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

        // DI services - Singletons
        ApiService,
        AuthService,
    ],
};
