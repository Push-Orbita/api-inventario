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
  constructor() {}

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
    pageDto.metadata.setPaginationData(1, 10); // Puedes ajustar esto si usas `request.limit` y `offset`
    pageDto.metadata.sortBy = request.sortBy;

    return pageDto;
  }

  async createDTO2Entity(request: CreateMovimientoRequestDto): Promise<Movimiento> {
    const movimiento = new Movimiento();
    movimiento.persona = request.persona;
    movimiento.fecha = request.fecha;
    movimiento.operacion = request.operacion;
    movimiento.detalle = request.detalle;
    movimiento.unidad = Unidad.fromId(request.unidad);
    return movimiento;
  }

  async updateDTO2Entity(
    movimiento: Movimiento,
    request: UpdateMovimientoRequestDto
  ): Promise<Movimiento> {
    request.persona ? (movimiento.persona = request.persona) : null;
    request.fecha ? (movimiento.fecha = request.fecha) : null;
    request.operacion ? (movimiento.operacion = request.operacion) : null;
    request.detalle ? (movimiento.detalle = request.detalle) : null;
    request.unidad ? (movimiento.unidad = Unidad.fromId(request.unidad)) : null;

    return movimiento;
  }
}
