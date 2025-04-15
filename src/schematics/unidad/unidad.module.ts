import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnidadService } from './unidad.service';
import { UnidadController } from './unidad.controller';
import { Unidad } from './entities/unidad.entity';
import { UnidadMapper } from './mappers/unidad.mapper';
import { UnidadRepository } from './repository/unidad-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unidad])
  ],
  controllers: [UnidadController],
  providers: [UnidadService, UnidadRepository, UnidadMapper],
  exports: [UnidadService]
})

export class UnidadModule {}