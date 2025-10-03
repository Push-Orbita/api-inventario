import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoBulkService } from './services/movimiento-bulk.service';
import { MovimientoController } from './movimiento.controller';
import { Movimiento } from './entities/movimiento.entity';
import { Unidad } from '../unidad/entities/unidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoRepository } from './repository/movimiento.repository';
import { MovimientoMapper } from './mappers/movimiento.mapper';
import { UnidadModule } from '../unidad/unidad.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento, Unidad]),
    UnidadModule
  ],
  controllers: [MovimientoController],
  providers: [MovimientoService, MovimientoBulkService, MovimientoRepository, MovimientoMapper],
  exports: [MovimientoService, MovimientoBulkService]
})
export class MovimientoModule { }
