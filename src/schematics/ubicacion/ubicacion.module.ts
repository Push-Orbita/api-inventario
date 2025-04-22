import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UbicacionService } from './ubicacion.service';
import { UbicacionController } from './ubicacion.controller';
import { Ubicacion } from './entities/ubicacion.entity';
import { UbicacionMapper } from './mappers/ubicacion.mapper';
import { UbicacionRepository } from './repository/ubicacion.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ubicacion])
  ],
  controllers: [UbicacionController],
  providers: [UbicacionService, UbicacionRepository, UbicacionMapper],
  exports: [UbicacionService]
})

export class UbicacionModule {}