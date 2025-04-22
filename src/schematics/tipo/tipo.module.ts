import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { Tipo } from './entities/tipo.entity';
import { TipoMapper } from './mappers/tipo.mapper';
import { TipoRepository } from './repository/tipo-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tipo])
  ],
  controllers: [TipoController],
  providers: [TipoService, TipoRepository, TipoMapper],
  exports: [TipoService]
})

export class TipoModule {}