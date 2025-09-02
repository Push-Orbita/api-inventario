import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";


export const DataSourceConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        __dirname + '/../../schematics/**/**/entities/*.entity{.ts,.js}',
        __dirname + '/../../schematics/**/entities/*.entity{.ts,.js}',
    ],
    migrations:
        process.env.NODE_ENV === 'production'
            ? ['dist/migration/*.js']
            : [__dirname + '/../../migration/*{.ts,.js}'],
    logging: false,
    synchronize: false, // Deshabilitado para evitar conflictos de tipos y fechas
}

export const AppDataSource = new DataSource(DataSourceConfig);