import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialUbicacionService } from './services/historial-ubicacion.service';
import { HistorialUbicacionController } from './historial-ubicacion.controller';
import { HistorialUbicacion } from './entities/historial-ubicacion.entity';
import { Unidad } from '../unidad/entities/unidad.entity';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HistorialUbicacion,
      Unidad,
      Ubicacion
    ])
  ],
  controllers: [HistorialUbicacionController],
  providers: [HistorialUbicacionService],
  exports: [HistorialUbicacionService]
})
export class HistorialUbicacionModule {}
