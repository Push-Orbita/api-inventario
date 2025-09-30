import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";


export function setupSwagger(app: INestApplication) {

    const local = {
        url: 'http://localhost:3000',
    }
    const production = {
        url: 'http://localhost:3001',
    }

    const config = new DocumentBuilder()
        .setTitle('Documentación del sistema Inventario')
        .setDescription('Sistema de Inventario')
        .setVersion('1.0')
        .addServer(local.url)
        .addServer(production.url)
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Ingrese su token JWT',
                in: 'header',
            },
            'JWT-auth',
        )
        .build();

    const options: SwaggerCustomOptions = {
        swaggerOptions: {
            docExpansion: 'none',
            persistAuthorization: true,
        },
    };

    config.servers = [local, production];
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, options);
}