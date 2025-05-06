import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Movimiento } from "../entities/movimiento.entity";
import { SearchMovimientoRequestDto } from "../dto/search-movimiento-request.dto";
import { PageDto } from "src/common/dto/page.dto";

@Injectable()
export class MovimientoRepository extends Repository<Movimiento> {
  constructor(private readonly dataSource: DataSource) {
    super(Movimiento, dataSource.createEntityManager());
  }

  async search(request: SearchMovimientoRequestDto): Promise<PageDto<Movimiento>> {
    const queryBuilder: SelectQueryBuilder<Movimiento> = this.dataSource
      .createQueryBuilder(Movimiento, "movimiento")
      .leftJoinAndSelect("movimiento.unidad", "unidad");

    if (request.persona) {
      queryBuilder.andWhere("movimiento.persona = :persona", {
        persona: request.persona,
      });
    }

    if (request.unidad) {
      queryBuilder.andWhere("movimiento.unidad = :unidad", {
        unidad: request.unidad,
      });
    }

    if (request.fecha) {
      queryBuilder.andWhere("DATE(movimiento.fecha) = :fecha", {
        fecha: request.fecha.toISOString().split("T")[0],
      });
    }

    if (request.operacion) {
      queryBuilder.andWhere("movimiento.operacion = :operacion", {
        operacion: request.operacion,
      });
    }

    if (request.detalle) {
      queryBuilder.andWhere("LOWER(movimiento.detalle) LIKE LOWER(:detalle)", {
        detalle: `%${request.detalle}%`,
      });
    }

    queryBuilder.orderBy("movimiento.id", "DESC");

    const [list, count] = await queryBuilder
      .skip(request.getOffset())
      .take(request.getTake())
      .getManyAndCount();

    return new PageDto<Movimiento>(list, count);
  }
}
