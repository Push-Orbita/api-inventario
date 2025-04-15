import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

import { Inventario } from '../entities/inventario.entity';
import { InventarioDTO } from '../dto/inventario.dto';
import { CreateInventarioRequestDto } from '../dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from '../dto/update-inventario-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchInventarioRequestDto } from '../dto/search-inventario-request.dto';


@Injectable()
export class InventarioMapper {

  constructor() {}

  async entity2DTO(inventario: Inventario): Promise<InventarioDTO> {
    const clienteDTO = plainToInstance(InventarioDTO, inventario, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return clienteDTO;
  }

  async page2Dto(request: SearchInventarioRequestDto, page: PageDto<Inventario>): Promise<PageDto<InventarioDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (proveedor) => {
        return this.entity2DTO(proveedor);
      }),
    );
    const pageDto = new PageDto<InventarioDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateInventarioRequestDto): Promise<Inventario> {
    const newInventario: Inventario = new Inventario();
    newInventario.codigo = request.codigo;
    newInventario.nombre = request.nombre;
    newInventario.modelo = request.modelo;
    return newInventario;
  }

  async updateDTO2Entity(editInventario: Inventario, request: UpdateInventarioRequestDto): Promise<Inventario> {
    request.codigo ? (editInventario.codigo = request.codigo) : null;
    request.nombre ? (editInventario.nombre = request.nombre) : null;
    request.modelo ? (editInventario.modelo = request.modelo) : null;
    return editInventario;
  }
}