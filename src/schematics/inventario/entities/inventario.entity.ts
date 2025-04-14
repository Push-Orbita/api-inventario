import { BaseEntity } from "src/common/baseEntity";
import { Column, Entity } from "typeorm";


@Entity({ name: 'inve_01_cab_inventario' })
export class Inventario extends BaseEntity {

    @Column({ name: 'inve01_codigo', unique: true, nullable: false })
    codigo: string;

    @Column({ name: 'inve01_nombre', unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'inve01_modelo' })
    modelo: string;
    
}