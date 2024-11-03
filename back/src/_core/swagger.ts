import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";
import { environment } from "src/environment/environment";

/**
 * Configure Swagger pour l'application.
 * Configure les pages qui sont listées ci-dessus.
 */
export function setupSwagger(app: NestExpressApplication): void {
    const swaggerBaseUri = environment.backendUriPrefix + environment.swaggerUriPrefix;

    const swaggerOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            tryItOutEnabled: true,
        },
        swaggerUrl: swaggerBaseUri,
        customSiteTitle: 'API Documentation',
    };

    const config = new DocumentBuilder()
        .setTitle("Angular/Nest POC API Documentation")
        .setDescription("no description provided for now")
        .build();

    const documentFactory = (): OpenAPIObject => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(swaggerBaseUri, app, documentFactory, swaggerOptions);
}
