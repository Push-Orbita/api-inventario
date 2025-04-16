import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Unidad } from "../entities/unidad.entity";
import { SearchUnidadRequestDto } from "../dto/search-unidad-request.dto";
import { PageDto } from "src/common/dto/page.dto";


@Injectable()
export class UnidadRepository extends Repository<Unidad> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Unidad, dataSource.createEntityManager())
    }

    async search( request: SearchUnidadRequestDto ): Promise<PageDto<Unidad>> {
        
        const queryBuilder: SelectQueryBuilder<Unidad> =
            this.dataSource.createQueryBuilder(Unidad, 'unidad')

        if (request.numeroSerie) {
            queryBuilder.andWhere('unidad.numeroSerie = :numeroSerie', {
                numeroSerie: request.numeroSerie,
            });
        }

        if (request.estado) {
            queryBuilder.andWhere('unidad.estado = :estado', {
                estado: request.estado,
            });
        }

        if (request.ubicacionActual) {
            queryBuilder.andWhere('unidad.ubicacionActual = :ubicacionActual', {
                ubicacionActual: request.ubicacionActual,
            });
        }

        if (request.inventario) {
            queryBuilder.andWhere('unidad.inventario = :inventario', {
                inventario: request.inventario,
            });
        }

        queryBuilder.orderBy('unidad.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Unidad>(list, count);
    }
}