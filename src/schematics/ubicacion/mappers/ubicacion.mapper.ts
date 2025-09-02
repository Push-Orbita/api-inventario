import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PageDto } from 'src/common/dto/page.dto';
import { Ubicacion } from '../entities/ubicacion.entity';
import { UbicacionDTO } from '../dto/ubicacion.dto';
import { CreateUbicacionRequestDto } from '../dto/create-ubicacion-request.dto';
import { UpdateUbicacionRequestDto } from '../dto/update-ubicacion-request.dto';
import { SearchUbicacionRequestDto } from '../dto/search-ubicacion-request.dto';


@Injectable()
export class UbicacionMapper {

  constructor() {}

  async entity2DTO(ubicacion: Ubicacion): Promise<UbicacionDTO> {
    const categoriaDTO = plainToInstance(UbicacionDTO, ubicacion, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return categoriaDTO;
  }

  async page2Dto(request: SearchUbicacionRequestDto, page: PageDto<Ubicacion>): Promise<PageDto<UbicacionDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (ubicacion) => {
        return this.entity2DTO(ubicacion);
      }),
    );
    const pageDto = new PageDto<UbicacionDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateUbicacionRequestDto): Promise<Ubicacion> {
    const newUbicacion: Ubicacion = new Ubicacion();
    newUbicacion.nombre = request.nombre;
    newUbicacion.direccion = request.direccion ? request.direccion : null;
    return newUbicacion;
  }

  async updateDTO2Entity(editUbicacion: Ubicacion, request: UpdateUbicacionRequestDto): Promise<Ubicacion> {
    request.nombre ? (editUbicacion.nombre = request.nombre) : null;
    request.direccion ? (editUbicacion.direccion = request.direccion) : null;
    return editUbicacion;
  }
}