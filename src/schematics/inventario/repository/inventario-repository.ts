import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Inventario } from "../entities/inventario.entity";
import { SearchInventarioRequestDto } from "../dto/search-inventario-request.dto";
import { PageDto } from "src/common/dto/page.dto";


@Injectable()
export class InventarioRepository extends Repository<Inventario> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Inventario, dataSource.createEntityManager())
    }

    async search( request: SearchInventarioRequestDto ): Promise<PageDto<Inventario>> {
        
        const queryBuilder: SelectQueryBuilder<Inventario> =
            this.dataSource.createQueryBuilder(Inventario, 'inventario')

        if (request.codigo) {
            queryBuilder.andWhere('inventario.codigo = :codigo', {
                codigo: request.codigo,
            });
        }

        if (request.nombre) {
            queryBuilder.andWhere('inventario.nombre = :nombre', {
                nombre: request.nombre,
            });
        }

        if (request.modelo) {
            queryBuilder.andWhere('inventario.modelo = :modelo', {
                modelo: request.modelo,
            });
        }

        queryBuilder.orderBy('inventario.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Inventario>(list, count);
    }
}