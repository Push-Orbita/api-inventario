import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';

dotenv.config();

export const DataSourceConfig: DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../schematics/**/entities/*.entity{.ts,.js}'],
    logging: true,
    synchronize: process.env.NODE_ENV !== 'production',
}

export const AppDataSource = new DataSource(DataSourceConfig);