import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { PageDto } from "src/common/dto/page.dto";
import { Marca } from "../entities/marca.entity";
import { SearchMarcaRequestDto } from "../dto/search-marca-request.dto";


@Injectable()
export class MarcaRepository extends Repository<Marca> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Marca, dataSource.createEntityManager())
    }

    async search(request: SearchMarcaRequestDto): Promise<PageDto<Marca>> {

        const queryBuilder: SelectQueryBuilder<Marca> =
            this.dataSource.createQueryBuilder(Marca, 'marca')


        if (request.nombre) {
            queryBuilder.andWhere('marca.nombre LIKE :nombre', {
                nombre: `%${request.nombre}%`,
            });
        }

        if (request.id) {
            queryBuilder.andWhere('marca.id = :id', {
                id: request.id,
            });
        }

        queryBuilder.orderBy('marca.nombre', 'ASC');
        queryBuilder.orderBy('marca.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Marca>(list, count);
    }
}