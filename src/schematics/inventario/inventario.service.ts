import { Injectable } from '@nestjs/common';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';

@Injectable()
export class InventarioService {
  create(createInventarioRequestDto: CreateInventarioRequestDto) {
    return 'This action adds a new inventario';
  }

  findAll() {
    return `This action returns all inventario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventario`;
  }

  update(id: number, updateInventarioRequestDto: UpdateInventarioRequestDto) {
    return `This action updates a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
