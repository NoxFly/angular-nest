import { ValidationPipe } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { join } from "path";
import { setupSwagger } from "src/_core/swagger";
import { convertTime } from "src/_tools/time.helper";
import { AppModule } from "src/app.module";
import { environment } from "src/environment/environment";
import { publicMiddleware } from "src/middlewares/public.middleware";
import { Server as HttpServer } from 'http';


export async function setup(): Promise<NestExpressApplication> {
    const app = await createApp();

    configureApp(app);
    setupMiddlewares(app);
    setupCorsAndCsp(app);
    serveStaticAssets(app);

    return app;
}

export async function startApp(app: NestExpressApplication): Promise<void> {
    const server = await app.listen(environment.appPort);

    const addr = server.address();
    let uri: string;

    if(typeof addr === 'string') {
        uri = addr;
    }
    else {
        const scheme = server instanceof HttpServer ? 'http' : 'https';
        const host = (addr.address === "::") ? 'localhost' : addr.address;
        const port = addr.port;
        uri = `${scheme}://${host}:${port}`;
    }

    console.info(`Server is running on ${uri}`);
}


// -------------------------------------------------------------------------------

/**
 * Créé une nouvelle instance d'application Nest + Express
 */
function createApp(): Promise<NestExpressApplication> {
    const app = NestFactory.create<NestExpressApplication>(AppModule, {
        logger: environment.production ? false : undefined,
        forceCloseConnections: environment.production,
    });
    return app;
}

/**
 * Configure globalement l'application
 * + le côté sécurité (cors + csp)
 */
function configureApp(app: NestExpressApplication): void {
    app.setGlobalPrefix(environment.backendUriPrefix.substring(1));
    app.getHttpAdapter().getInstance().disable('x-powered-by');
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        disableErrorMessages: environment.production,
    }));
}

/**
 * Configure les middlewares globaux de l'application
 */
function setupMiddlewares(app: NestExpressApplication): void {
    const cookieSecret = environment.refreshTokenSecret;

    const cookieOptions: any = {
        httpOnly: true,
        secure: environment.production,
        sameSite: 'strict',
        expires: new Date(Date.now() + convertTime(environment.refreshTokenExpiration, 'ms')),
        path: '/',
    };

    app.use(cookieParser(cookieSecret, cookieOptions));
    app.use(publicMiddleware);

    if(!environment.production) {
        app.use(environment.backendUriPrefix, morgan("dev"));
        setupSwagger(app);
    }
}

/**
 * Configure le CORS et CSP de l'application
 */
function setupCorsAndCsp(app: NestExpressApplication): void {
    getFrontendOrigin(app);

    environment.csp = environment.csp
        .replace(new RegExp('{FE}', 'g'), environment.frontendOrigin)
        .replace(/\s+/g, ' ')
        .trim();

    const cors: CorsOptions = {
        origin: environment.frontendOrigin,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };

    app.enableCors(cors);
}

/**
 * Définit les assets statiques à servir
 */
function serveStaticAssets(app: NestExpressApplication): void {
    environment.frontendPath = join(environment.root, environment.frontendPath);

    app.useStaticAssets(environment.frontendPath, {
        setHeaders: (res, path, stat) => {
            res.set('Content-Security-Policy', environment.csp);
            res.set('X-Content-Type-Options', 'nosniff');
            res.set('X-Frame-Options', 'DENY');
        },
        index: ['index.html'],
    });
}

/**
 * la vraie origine du serveur web, correspond à 'self' dans les csp
 */
function getWebserverOrigin(app: NestExpressApplication): string {
    const instance = app.getHttpAdapter().getInstance();

    const protocol = instance.get('protocol') || 'http';
    const host = instance.get('host') || 'localhost';
    const port = instance.get('port') || environment.appPort;

    const origin = `${protocol}://${host}:${port}`;

    return origin;
}

function getFrontendOrigin(app: NestExpressApplication): string {
    if(environment.production) {
        environment.frontendOrigin = getWebserverOrigin(app);
    }

    return environment.frontendOrigin;
}
