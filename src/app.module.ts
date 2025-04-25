import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceConfig } from './config/typeorm/data-source';

import { ProductoModule } from './schematics/producto/producto.module';
import { ModeloModule } from './schematics/modelo/modelo.module';
import { MarcaModule } from './schematics/marca/marca.module';
import { TipoModule } from './schematics/tipo/tipo.module';
import { CategoriaModule } from './schematics/categoria/categoria.module';
import { UbicacionModule } from './schematics/ubicacion/ubicacion.module';
import { UnidadModule } from './schematics/unidad/unidad.module';
import { MovimientosModule } from './schematics/movimientos/movimientos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRoot({
      ...DataSourceConfig
    }),

    ProductoModule,
    ModeloModule,
    MarcaModule,
    TipoModule,
    CategoriaModule,
    UbicacionModule,
    UnidadModule,
    MovimientosModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}