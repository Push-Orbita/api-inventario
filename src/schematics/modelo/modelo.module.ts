import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { Modelo } from './entities/modelo.entity';
import { ModeloMapper } from './mappers/modelo.mapper';
import { ModeloRepository } from './repository/modelo-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modelo])
  ],
  controllers: [ModeloController],
  providers: [ModeloService, ModeloRepository, ModeloMapper],
  exports: [ModeloService]
})

export class ModeloModule {}