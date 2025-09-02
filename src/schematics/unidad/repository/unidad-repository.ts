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

    async search(request: SearchUnidadRequestDto): Promise<PageDto<Unidad>> {

        const queryBuilder: SelectQueryBuilder<Unidad> =
            this.dataSource.createQueryBuilder(Unidad, 'unidad')
            .leftJoinAndSelect('unidad.producto', 'producto')
            .leftJoinAndSelect('unidad.ubicacion', 'ubicacion');

        if (request.numero_serie) {
            queryBuilder.andWhere('LOWER(unidad.numero_serie) LIKE LOWER(:numero_serie)', {
                numero_serie: `%${request.numero_serie}%`,
            });
        }

        if (request.codigo_com) {
            queryBuilder.andWhere('LOWER(unidad.codigo_com) LIKE LOWER(:codigo_com)', {
                codigo_com: `%${request.codigo_com}%`,
            });
        }

        if (request.estado) {
            queryBuilder.andWhere('unidad.estado = :estado', {
                estado: request.estado,
            });
        }

        if (request.producto) {
            queryBuilder.andWhere('unidad.producto = :producto', {
                producto: request.producto,
            });
        }

        if (request.ubicacion) {
            queryBuilder.andWhere('unidad.ubicacion = :ubicacion', {
                ubicacion: request.ubicacion,
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