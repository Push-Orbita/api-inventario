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

        if (request.codigo) {
            queryBuilder.andWhere('unidad.codigo = :codigo', {
                codigo: request.codigo,
            });
        }

        if (request.nombre) {
            queryBuilder.andWhere('unidad.nombre = :nombre', {
                nombre: request.nombre,
            });
        }

        if (request.modelo) {
            queryBuilder.andWhere('unidad.modelo = :modelo', {
                modelo: request.modelo,
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