import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarcaService } from './marca.service';
import { MarcaController } from './marca.controller';
import { Marca } from './entities/marca.entity';
import { MarcaMapper } from './mappers/marca.mapper';
import { MarcaRepository } from './repository/marca.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Marca])
  ],
  controllers: [MarcaController],
  providers: [MarcaService, MarcaRepository, MarcaMapper],
  exports: [MarcaService]
})

export class MarcaModule {}