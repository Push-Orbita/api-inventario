import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity } from "typeorm";
import { TipoEstadoEnum } from "src/common/enums/tipo-estado.enum";


@Entity({ name: 'inve_04_det_unidades' })
export class Unidad extends BaseEntity {

    @Column({ name: 'inve04_numero_serie', unique: true, nullable: false })
    numeroSerie: string;

    @Column({ name: 'inve04_estado', type: 'enum', enum: TipoEstadoEnum })
    estado: TipoEstadoEnum;

    @Column({ name: 'inve04_ubicacion_actual' })
    ubicacionActual: string;
    
}