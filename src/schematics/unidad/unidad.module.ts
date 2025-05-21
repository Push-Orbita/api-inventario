import { Module } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { UnidadRepository } from './repository/unidad-repository';
import { UnidadMapper } from './mappers/unidad.mapper';
import { ProductoModule } from '../producto/producto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unidad]),
    ProductoModule
  ],
  controllers: [UnidadController],
  providers: [UnidadService, UnidadRepository, UnidadMapper],
  exports: [UnidadService, UnidadRepository]
})
export class UnidadModule {}
