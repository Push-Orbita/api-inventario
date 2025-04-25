import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function setupSwagger(app: INestApplication) {
    const local = {
        url: 'http://localhost:3000',
    }
    const test = {
        url: 'http://localhost:3001',
    }

    const config = new DocumentBuilder()
        .setTitle('Documentación del sistema Inventario')
        .setDescription('Sistema de Inventario')
        .setVersion('1.0')
        .build();
    
    config.servers = [local, test];
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}