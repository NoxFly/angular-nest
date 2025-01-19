import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { environment } from "src/environment/environment";

/**
 * Configure Swagger pour l'application.
 * Configure les pages qui sont listées ci-dessus.
 */
export function setupSwagger(app: NestExpressApplication): void {
    const swaggerBaseUri = environment.swaggerUriPrefix;

    const swaggerOptions: SwaggerCustomOptions = {
        swaggerUrl: swaggerBaseUri,
        customSiteTitle: 'API Documentation',
        swaggerUiEnabled: !environment.production,
        swaggerOptions: {
            tryItOutEnabled: true,
            requestInterceptor: (req) => {
                req.headers['Content-Type'] = 'application/json';
                req.headers['Accept'] = 'application/json';
                return req;
            },
        },
    };

    const config = new DocumentBuilder()
        .setTitle("Angular/Nest POC API Documentation")
        .setDescription("no description provided for now")
        .build();

    const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerBaseUri, app, documentFactory, swaggerOptions);
}
