import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { Tipo } from '../entities/tipo.entity';
import { TipoDTO } from '../dto/tipo.dto';
import { CreateTipoRequestDto } from '../dto/create-tipo-request.dto';
import { UpdateTipoRequestDto } from '../dto/update-tipo-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchTipoRequestDto } from '../dto/search-tipo-request.dto';


@Injectable()
export class TipoMapper {

  constructor() {}

  async entity2DTO(tipo: Tipo): Promise<TipoDTO> {
    const tipoDTO = plainToInstance(TipoDTO, tipo, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return tipoDTO;
  }

  async page2Dto(request: SearchTipoRequestDto, page: PageDto<Tipo>): Promise<PageDto<TipoDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (tipo) => {
        return this.entity2DTO(tipo);
      }),
    );
    const pageDto = new PageDto<TipoDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateTipoRequestDto): Promise<Tipo> {
    const newTipo: Tipo = new Tipo();
    newTipo.nombre = request.nombre;
    newTipo.descripcion = request.descipcion;
    return newTipo;
  }

  async updateDTO2Entity(editTipo: Tipo, request: UpdateTipoRequestDto): Promise<Tipo> {
    request.nombre ? (editTipo.nombre = request.nombre) : null;
    request.descripcion ? (editTipo.descripcion = request.descripcion) : null;
    return editTipo;
  }
}