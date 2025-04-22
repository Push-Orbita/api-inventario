import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { CategoriaMapper } from './mappers/categoria.mapper';
import { CategoriaRepository } from './repository/categoria.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria])
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository, CategoriaMapper],
  exports: [CategoriaService]
})

export class CategoriaModule {}