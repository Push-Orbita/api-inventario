import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/baseEntity";
import { Producto } from "src/schematics/producto/entities/producto.entity";


@Entity({ name: 'inve_07_cab_ubicacion' })
export class Ubicacion extends BaseEntity {

    @Column({ name: 'inve07_nombre', unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'inve07_direccion', nullable: true })
    direccion: string;

    static fromId(id: number) {
        const producto = new Ubicacion();
        producto.id = id;
        return producto;
    }

}