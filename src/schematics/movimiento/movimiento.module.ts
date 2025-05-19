import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { Movimiento } from './entities/movimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoRepository } from './repository/movimiento.repository';
import { MovimientoMapper } from './mappers/movimiento.mapper';
import { UnidadModule } from '../unidad/unidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
    UnidadModule
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService, MovimientoRepository, MovimientoMapper],
  exports: [MovimientoService]
})
export class MovimientoModule { }
