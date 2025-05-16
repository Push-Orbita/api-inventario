import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { Producto } from "../entities/producto.entity";
import { SearchProductoRequestDto } from "../dto/search-producto-request.dto";
import { PageDto } from "src/common/dto/page.dto";


@Injectable()
export class ProductoRepository extends Repository<Producto> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Producto, dataSource.createEntityManager())
    }

    async search(request: SearchProductoRequestDto): Promise<PageDto<Producto>> {

        const queryBuilder: SelectQueryBuilder<Producto> =
            this.dataSource.createQueryBuilder(Producto, 'producto')
            .leftJoinAndSelect('producto.modelo', 'modelo')
            .leftJoinAndSelect('producto.marca', 'marca')
            .leftJoinAndSelect('producto.tipo', 'tipo')
            .leftJoinAndSelect('producto.categoria', 'categoria');


        if (request.nombre) {
            queryBuilder.andWhere('producto.nombre LIKIE :nombre', {
                nombre: `%${request.nombre}%`,
            });
        }

        if (request.caracteristicas) {
            queryBuilder.andWhere('producto.caracteristicas LIKE :caracteristicas', {
                caracteristicas: `%${request.caracteristicas}%`,
            });
        }
        if (request.id) {
            queryBuilder.andWhere('producto.id = :id', {
                id: request.id,
            });
        }
        if (request.modelo) {
            queryBuilder.andWhere('producto.modelo = :modelo', {
                modelo: request.modelo,
            });
        }
        if (request.marca) {
            queryBuilder.andWhere('producto.marca = :marca', {
                marca: request.marca,
            });
        }
        if (request.tipo) {
            queryBuilder.andWhere('producto.tipo = :tipo', {
                tipo: request.tipo,
            });
        }
        if (request.categoria) {
            queryBuilder.andWhere('producto.categoria = :categoria', {
                categoria: request.categoria,
            });
        }

        queryBuilder.orderBy('producto.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Producto>(list, count);
    }
}