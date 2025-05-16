import { Injectable } from "@nestjs/common";
import { DataSource, Repository, SelectQueryBuilder } from "typeorm";
import { PageDto } from "src/common/dto/page.dto";
import { Ubicacion } from "../entities/ubicacion.entity";
import { SearchUbicacionRequestDto } from "../dto/search-ubicacion-request.dto";


@Injectable()
export class UbicacionRepository extends Repository<Ubicacion> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(Ubicacion, dataSource.createEntityManager())
    }

    async search(request: SearchUbicacionRequestDto): Promise<PageDto<Ubicacion>> {

        const queryBuilder: SelectQueryBuilder<Ubicacion> =
            this.dataSource.createQueryBuilder(Ubicacion, 'ubicacion')


        if (request.nombre) {
            queryBuilder.andWhere('ubicacion.nombre LIKE :nombre', {
                nombre: `%${request.nombre}%`,
            });
        }

        if (request.direccion) {
            queryBuilder.andWhere('ubicacion.direccion LIKE :direccion', {
              direccion: `%${request.direccion}%`,
            });
          }

        if (request.id) {
            queryBuilder.andWhere('ubicacion.id = :id', {
                id: request.id,
            });
        }

        queryBuilder.orderBy('ubicacion.nombre', 'ASC');
        queryBuilder.orderBy('ubicacion.id', 'DESC');

        const [list, count] = await queryBuilder
            .skip(request.getOffset())
            .take(request.getTake())
            .getManyAndCount();

        return new PageDto<Ubicacion>(list, count);
    }
}