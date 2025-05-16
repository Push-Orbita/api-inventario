import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { PageDto } from "src/common/dto/page.dto";
import { Categoria } from "../entities/categoria.entity";
import { SearchCategoriaRequestDto } from "../dto/search-categoria-request.dto";


@Injectable()
export class CategoriaRepository extends Repository<Categoria> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Categoria, dataSource.createEntityManager())
    }

    async search(request: SearchCategoriaRequestDto): Promise<PageDto<Categoria>> {

        const queryBuilder: SelectQueryBuilder<Categoria> =
            this.dataSource.createQueryBuilder(Categoria, 'categoria')

        if (request.id) {
            queryBuilder.andWhere('categoria.id = :id', {
                id: request.id,
            });
        }

        if (request.nombre) {
            queryBuilder.andWhere('categoria.nombre LIKE :nombre', {
                nombre: `%${request.nombre}%`,
            });
        }

        if (request.descripcion) {
            queryBuilder.andWhere('categoria.descripcion LIKE :descripcion', {
                descripcion: `%${request.descripcion}%`,
            });
        }

        queryBuilder.orderBy('categoria.nombre', 'ASC');
        queryBuilder.orderBy('categoria.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Categoria>(list, count);
    }
}