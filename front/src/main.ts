import { registerLocaleData } from "@angular/common";
import localeExtraFr from "@angular/common/locales/extra/fr";
import localeFr from "@angular/common/locales/fr";
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { appConfig } from 'src/app/core/app.config';

registerLocaleData(localeFr, "fr-FR", localeExtraFr);

bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
