import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Modelo } from "../entities/modelo.entity";
import { SearchModeloRequestDto } from "../dto/search-modelo-request.dto";
import { PageDto } from "src/common/dto/page.dto";


@Injectable()
export class ModeloRepository extends Repository<Modelo> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Modelo, dataSource.createEntityManager())
    }

    async search(request: SearchModeloRequestDto): Promise<PageDto<Modelo>> {

        const queryBuilder: SelectQueryBuilder<Modelo> =
            this.dataSource.createQueryBuilder(Modelo, 'modelo')


        if (request.nombre) {
            queryBuilder.andWhere('modelo.nombre = :nombre', {
                nombre: request.nombre,
            });
        }
        if (request.id) {
            queryBuilder.andWhere('modelo.id = :id', {
                id: request.id,
            });
        }


        queryBuilder.orderBy('modelo.nombre', 'ASC');
        queryBuilder.orderBy('modelo.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Modelo>(list, count);
    }
}