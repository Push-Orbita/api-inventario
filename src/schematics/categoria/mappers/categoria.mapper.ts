import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PageDto } from 'src/common/dto/page.dto';
import { Categoria } from '../entities/categoria.entity';
import { CategoriaDTO } from '../dto/categoria.dto';
import { CreateCategoriaRequestDto } from '../dto/create-categoria-request.dto';
import { UpdateCategoriaRequestDto } from '../dto/update-categoria-request.dto';
import { SearchCategoriaRequestDto } from '../dto/search-categoria-request.dto';


@Injectable()
export class CategoriaMapper {

  constructor() {}

  async entity2DTO(categoria: Categoria): Promise<CategoriaDTO> {
    const categoriaDTO = plainToInstance(CategoriaDTO, categoria, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return categoriaDTO;
  }

  async page2Dto(request: SearchCategoriaRequestDto, page: PageDto<Categoria>): Promise<PageDto<CategoriaDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (categoria) => {
        return this.entity2DTO(categoria);
      }),
    );
    const pageDto = new PageDto<CategoriaDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateCategoriaRequestDto): Promise<Categoria> {
    const newCategoria: Categoria = new Categoria();
    newCategoria.nombre = request.nombre;
    newCategoria.descripcion = request.descripcion || null;
    return newCategoria;
  }

  async updateDTO2Entity(editCategoria: Categoria, request: UpdateCategoriaRequestDto): Promise<Categoria> {
    if (request.nombre !== undefined) {
      editCategoria.nombre = request.nombre;
    }
    if (request.descripcion !== undefined) {
      editCategoria.descripcion = request.descripcion || null;
    }
    return editCategoria;
  }
}