import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { Unidad } from '../entities/unidad.entity';
import { UnidadDTO } from '../dto/unidad.dto';
import { CreateUnidadRequestDto } from '../dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from '../dto/update-unidad-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchUnidadRequestDto } from '../dto/search-unidad-request.dto';
import { Inventario } from 'src/schematics/inventario/entities/inventario.entity';


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
    newUnidad.numeroSerie = request.numeroSerie;
    newUnidad.estado = request.estado;
    newUnidad.ubicacionActual = request.ubicacionActual;
    newUnidad.inventario = Inventario.fromId(request.inventario);
    return newUnidad;
  }

  async updateDTO2Entity(editUnidad: Unidad, request: UpdateUnidadRequestDto): Promise<Unidad> {
    request.numeroSerie ? (editUnidad.numeroSerie = request.numeroSerie) : null;
    request.estado ? (editUnidad.estado = request.estado) : null;
    request.ubicacionActual ? (editUnidad.ubicacionActual = request.ubicacionActual) : null;
    return editUnidad;
  }
}