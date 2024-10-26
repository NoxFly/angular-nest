import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsLoggerPluginModule, withNgxsLoggerPlugin } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule, withNgxsStoragePlugin } from "@ngxs/storage-plugin";
import { NgxsModule, provideStore } from "@ngxs/store";
import { routes } from 'src/app/app.routes';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserState } from 'src/app/core/states/user.state';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({
            eventCoalescing: true,
        }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),

        // Locale
        { provide: LOCALE_ID, useValue: "fr-FR" },
        { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },

        // DI constants
        { provide: 'BACKEND_URL', useValue: environment.backend.url },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

        // NGXS
        provideStore(
            [UserState],
            {
                developmentMode: !environment.production,
                compatibility: {
                    strictContentSecurityPolicy: true,
                }
            },
            withNgxsStoragePlugin({
                keys: '*',
            }),
            withNgxsLoggerPlugin({
                logger: console,
                collapsed: true,
                disabled: !!environment.production
            }),
        ),

        // DI services - Singletons
        ApiService,
        AuthService,
    ],
};
