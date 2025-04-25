import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';

@Injectable()
export class UnidadService {

  constructor(
    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
  ) {}

  public async create(createUnidadDto: CreateUnidadRequestDto){

    try {
    const unidad = this.unidadRepository.create({
      ...createUnidadDto,
      producto: Producto.fromId(createUnidadDto.producto),
      ubicacion: Ubicacion.fromId(createUnidadDto.ubicacion),
    });

    await this.unidadRepository.save(unidad);
    return unidad;

  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('Ayuda!');
  }
  }

  findAll() {
    return `This action returns all unidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidad`;
  }

  update(id: number, updateUnidadDto: UpdateUnidadDto) {
    return `This action updates a #${id} unidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidad`;
  }
}
