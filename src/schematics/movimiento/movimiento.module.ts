import { Module } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoController } from './movimiento.controller';
import { Movimiento } from './entities/movimiento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimientoRepository } from './repository/movimiento.repository';
import { MovimientoMapper } from './mappers/movimiento.mapper';

@Module({
  imports: [
      TypeOrmModule.forFeature([Movimiento]),
    ],
  controllers: [MovimientoController],
  providers: [MovimientoService, MovimientoRepository, MovimientoMapper],
  exports: [MovimientoService]
})
export class MovimientoModule {}
