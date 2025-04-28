import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from './dto/update-unidad-request.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Unidad } from './entities/unidad.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Ubicacion } from '../ubicacion/entities/ubicacion.entity';
import { UnidadMapper } from './mappers/unidad.mapper';
import { UnidadRepository } from './repository/unidad-repository';

@Injectable()
export class UnidadService {

  constructor(
      private readonly unidadMapper: UnidadMapper,
      private readonly unidadRepository: UnidadRepository,
  ) {}

  public async create(request: CreateUnidadRequestDto): Promise<UnidadDTO> {

    try {
      const newUnidad = await this.unidadMapper.createDTO2Entity(request);
      await this.unidadRepository.save(newUnidad);
      const unidadSaved = await this.unidadMapper.entity2DTO(newUnidad);
      return unidadSaved;

    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Unidad: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all unidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unidad`;
  }

  update(id: number, updateUnidadDto: UpdateUnidadRequestDto) {
    return `This action updates a #${id} unidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} unidad`;
  }
}
