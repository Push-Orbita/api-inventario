import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PageDto } from 'src/common/dto/page.dto';
import { Marca } from '../entities/marca.entity';
import { MarcaDTO } from '../dto/marca.dto';
import { CreateMarcaRequestDto } from '../dto/create-marca-request.dto';
import { UpdateMarcaRequestDto } from '../dto/update-marca-request.dto';
import { SearchMarcaRequestDto } from '../dto/search-marca-request.dto';


@Injectable()
export class MarcaMapper {

  constructor() {}

  async entity2DTO(marca: Marca): Promise<MarcaDTO> {
    const marcaDTO = plainToInstance(MarcaDTO, marca, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return marcaDTO;
  }

  async page2Dto(request: SearchMarcaRequestDto, page: PageDto<Marca>): Promise<PageDto<MarcaDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (marca) => {
        return this.entity2DTO(marca);
      }),
    );
    const pageDto = new PageDto<MarcaDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateMarcaRequestDto): Promise<Marca> {
    const newMarca: Marca = new Marca();
    newMarca.nombre = request.nombre;
    return newMarca;
  }

  async updateDTO2Entity(editMarca: Marca, request: UpdateMarcaRequestDto): Promise<Marca> {
    request.nombre ? (editMarca.nombre = request.nombre) : null;
    return editMarca;
  }
}