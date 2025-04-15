import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/typeorm/data-source';
import { InventarioModule } from './schematics/inventario/inventario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),

    InventarioModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}