import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Tipo } from "../entities/tipo.entity";
import { SearchTipoRequestDto } from "../dto/search-tipo-request.dto";
import { PageDto } from "src/common/dto/page.dto";


@Injectable()
export class TipoRepository extends Repository<Tipo> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Tipo, dataSource.createEntityManager())
    }

    async search(request: SearchTipoRequestDto): Promise<PageDto<Tipo>> {

        const queryBuilder: SelectQueryBuilder<Tipo> =
            this.dataSource.createQueryBuilder(Tipo, 'tipo')


        if (request.nombre) {
            queryBuilder.andWhere('tipo.nombre LIKE :nombre', {
                nombre: `%${request.nombre}%`,
            });
        }
        if (request.descripcion) {
            queryBuilder.andWhere('tipo.descripcion LIKE :descripcion', {
                descripcion: `%${request.descripcion}%`,
            });
        }
        if (request.id) {
            queryBuilder.andWhere('tipo.id = :id', {
                id: request.id,
            });
        }


        queryBuilder.orderBy('tipo.nombre', 'ASC');
        queryBuilder.orderBy('tipo.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Tipo>(list, count);
    }
}