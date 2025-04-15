import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { Unidad } from '../entities/unidad.entity';
import { UnidadDTO } from '../dto/unidad.dto';
import { CreateUnidadRequestDto } from '../dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from '../dto/update-unidad-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchUnidadRequestDto } from '../dto/search-unidad-request.dto';


@Injectable()
export class UnidadMapper {

  constructor() {}

  async entity2DTO(unidad: Unidad): Promise<UnidadDTO> {
    const clienteDTO = plainToInstance(UnidadDTO, unidad, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return clienteDTO;
  }

  async page2Dto(request: SearchUnidadRequestDto, page: PageDto<Unidad>): Promise<PageDto<UnidadDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (proveedor) => {
        return this.entity2DTO(proveedor);
      }),
    );
    const pageDto = new PageDto<UnidadDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateUnidadRequestDto): Promise<Unidad> {
    const newUnidad: Unidad = new Unidad();
    newUnidad.codigo = request.codigo;
    newUnidad.nombre = request.nombre;
    newUnidad.modelo = request.modelo;
    return newUnidad;
  }

  async updateDTO2Entity(editUnidad: Unidad, request: UpdateUnidadRequestDto): Promise<Unidad> {
    request.codigo ? (editUnidad.codigo = request.codigo) : null;
    request.nombre ? (editUnidad.nombre = request.nombre) : null;
    request.modelo ? (editUnidad.modelo = request.modelo) : null;
    return editUnidad;
  }
}