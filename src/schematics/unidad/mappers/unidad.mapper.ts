import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PageDto } from 'src/common/dto/page.dto';
import { Unidad } from '../entities/unidad.entity';
import { UnidadDTO } from '../dto/unidad.dto';
import { CreateUnidadRequestDto } from '../dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from '../dto/update-unidad-request.dto';
import { SearchUnidadRequestDto } from '../dto/search-unidad-request.dto';

import { Producto } from 'src/schematics/producto/entities/producto.entity';

@Injectable()
export class UnidadMapper {

    constructor() {}

    // Convertir una entidad Unidad a su DTO correspondiente
    async entity2DTO(unidad: Unidad): Promise<UnidadDTO> {
        const unidadDTO = plainToInstance(UnidadDTO, unidad, {
            excludeExtraneousValues: true
        });
        return unidadDTO;
    }

    // Convertir una lista de entidades Unidad a su DTO correspondiente
    async page2Dto(request: SearchUnidadRequestDto, page: PageDto<Unidad>): Promise<PageDto<UnidadDTO>> {
        const dtos = await Promise.all(
            page.data.map(async (unidad) => {
            return this.entity2DTO(unidad);
            }),
        );
        const pageDto = new PageDto<UnidadDTO>(dtos, page.metadata.count);
        pageDto.metadata.setPaginationData(1, 10);
        pageDto.metadata.sortBy = request.sortBy;
        return pageDto;
    }

    // Convertir un DTO de creación a una entidad Unidad
    async createDTO2Entity(request: CreateUnidadRequestDto): Promise<Unidad> {
        const newUnidad: Unidad = new Unidad();
        newUnidad.producto = Producto.fromId(request.producto);
        newUnidad.fechaAdquisicion = request.fechaAdquisicion;
        newUnidad.numero_serie = request.numero_serie;
        newUnidad.cod_barra = request.cod_barra;
        newUnidad.estado = request.estado;
        // La ubicación se maneja a través del historial de ubicaciones
        return newUnidad;
    }

    // Convertir un DTO de actualización a una entidad Unidad
    async updateDTO2Entity(editUnidad: Unidad, request: UpdateUnidadRequestDto): Promise<Unidad> {
        request.producto ? (editUnidad.producto = Producto.fromId(request.producto)) : null;
        request.fechaAdquisicion ? (editUnidad.fechaAdquisicion = request.fechaAdquisicion) : null;
        request.numero_serie ? (editUnidad.numero_serie = request.numero_serie) : null;
        request.cod_barra ? (editUnidad.cod_barra = request.cod_barra) : null;
        request.estado ? (editUnidad.estado = request.estado) : null;
        // La ubicación se maneja a través del historial de ubicaciones
        return editUnidad;
    }
}
