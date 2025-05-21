import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from './entities/producto.entity';
import { ProductoMapper } from './mappers/producto.mapper';
import { ProductoRepository } from './repository/producto-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto])
  ],
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository, ProductoMapper],
  exports: [ProductoService, ProductoRepository]
})

export class ProductoModule {}