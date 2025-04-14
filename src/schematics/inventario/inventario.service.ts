import { Injectable } from '@nestjs/common';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';

@Injectable()
export class InventarioService {

  constructor(
    private readonly inventarioRepository: Repository<Inventario>
  ){}

  create(createInventarioRequestDto: CreateInventarioRequestDto) {
    return 'This action adds a new inventario';
  }

  findAll() {
    return `This action returns all inventario`;
  }

  public async findOne(id: string) {
    try {
      const inventario = await this.inventarioRepository.findOneBy({ id: id });
      return inventario
    } catch (error) {
      throw new Error(error)
    }   
  }

  update(id: number, updateInventarioRequestDto: UpdateInventarioRequestDto) {
    return `This action updates a #${id} inventario`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventario`;
  }
}
