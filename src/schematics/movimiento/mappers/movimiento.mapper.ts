import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";

import { MovimientoDTO } from "../dto/movimiento.dto";
import { Movimiento } from "../entities/movimiento.entity";
import { PageDto } from "src/common/dto/page.dto";
import { SearchMovimientoRequestDto } from "../dto/search-movimiento-request.dto";
import { CreateMovimientoRequestDto } from "../dto/create-movimiento-request.dto";
import { UpdateMovimientoRequestDto } from "../dto/update-movimiento-request.dto";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";

@Injectable()
export class MovimientoMapper {
  constructor() { }

  async entity2DTO(movimiento: Movimiento): Promise<MovimientoDTO> {
    return plainToInstance(MovimientoDTO, movimiento, {
      excludeExtraneousValues: true,
    });
  }

  async page2Dto(
    request: SearchMovimientoRequestDto,
    page: PageDto<Movimiento>
  ): Promise<PageDto<MovimientoDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (movimiento) => this.entity2DTO(movimiento))
    );

    const pageDto = new PageDto<MovimientoDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;

    return pageDto;
  }

  async createDTO2Entity(request: CreateMovimientoRequestDto): Promise<Movimiento> {
    const movimiento = new Movimiento();
    movimiento.persona = request.persona;
    movimiento.fecha = request.fecha;
    movimiento.operacion = request.operacion;
    movimiento.detalle = request.detalle;
    movimiento.confirmado = request.confirmado || null;
    movimiento.unidad = Unidad.fromId(request.unidad);
    return movimiento;
  }

  async updateDTO2Entity(
    movimiento: Movimiento,
    request: UpdateMovimientoRequestDto
  ): Promise<Movimiento> {

    if (request.persona !== undefined && request.persona !== null) {
      movimiento.persona = request.persona;
    }

    if (request.fecha !== undefined && request.fecha !== null) {
      movimiento.fecha = request.fecha;
    }

    if (request.operacion !== undefined && request.operacion !== null) {
      movimiento.operacion = request.operacion;
    }

    if (request.detalle !== undefined && request.detalle !== null) {
      movimiento.detalle = request.detalle;
    }

    if (request.unidad !== undefined && request.unidad !== null) {
      movimiento.unidad = Unidad.fromId(request.unidad);
    }

    if (request.confirmado !== undefined && request.confirmado !== null) {
      movimiento.confirmado = request.confirmado;
    }

    return movimiento;
  }

}