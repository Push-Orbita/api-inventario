import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { PageDto } from 'src/common/dto/page.dto';
import { Modelo } from '../entities/modelo.entity';
import { ModeloDTO } from '../dto/modelo.dto';
import { CreateModeloRequestDto } from '../dto/create-modelo-request.dto';
import { UpdateModeloRequestDto } from '../dto/update-modelo-request.dto';
import { SearchModeloRequestDto } from '../dto/search-modelo-request.dto';


@Injectable()
export class ModeloMapper {

  constructor() {}

  async entity2DTO(modelo: Modelo): Promise<ModeloDTO> {
    const modeloDTO = plainToInstance(ModeloDTO, modelo, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return modeloDTO;
  }

  async page2Dto(request: SearchModeloRequestDto, page: PageDto<Modelo>): Promise<PageDto<ModeloDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (modelo) => {
        return this.entity2DTO(modelo);
      }),
    );
    const pageDto = new PageDto<ModeloDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateModeloRequestDto): Promise<Modelo> {
    const newModelo: Modelo = new Modelo();
    newModelo.nombre = request.nombre;
    return newModelo;
  }

  async updateDTO2Entity(editModelo: Modelo, request: UpdateModeloRequestDto): Promise<Modelo> {
    request.nombre ? (editModelo.nombre = request.nombre) : null;
    return editModelo;
  }
}