import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario } from './entities/inventario.entity';
import { InventarioMapper } from './mappers/inventario.mapper';
import { InventarioRepository } from './repository/inventario-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventario])
  ],
  controllers: [InventarioController],
  providers: [InventarioService, InventarioRepository, InventarioMapper],
  exports: [InventarioService]
})

export class InventarioModule {}