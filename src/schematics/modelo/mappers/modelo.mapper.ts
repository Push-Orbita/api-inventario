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

  // convierte una instancia de Modelo (entidad) a ModeloDTO
  async entity2DTO(modelo: Modelo): Promise<ModeloDTO> {
    const modeloDTO = plainToInstance(ModeloDTO, modelo, { 
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    }); 
    return modeloDTO; // devuelve dto listo para enviar al frontend 
  }

  async page2Dto(request: SearchModeloRequestDto, page: PageDto<Modelo>): Promise<PageDto<ModeloDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (modelo) => { // recorre page.data que contiene entidades Modelo
        return this.entity2DTO(modelo); // para cada una de ellas llama a entity2DTO para convertirlas en dtos
      }),
    );
    const pageDto = new PageDto<ModeloDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  // recibe un dto de creación (datos de un post) y lo convierte 
  // en una entidad Modelo para guardar en la base de datos
  async createDTO2Entity(request: CreateModeloRequestDto): Promise<Modelo> {
    const newModelo: Modelo = new Modelo(); // crea una instancia de la entidad
    newModelo.nombre = request.nombre; // le asigna el nombre recibido del dto
    return newModelo; // devuelve la entidad lista para guardar
  }

  // actualiza una entidad Modelo existente con los datos que vienen de un DTO de actualización.
  async updateDTO2Entity(editModelo: Modelo, request: UpdateModeloRequestDto): Promise<Modelo> {
    request.nombre ? (editModelo.nombre = request.nombre) : null;
    return editModelo;
  }

}