import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";


@Entity({ name: 'inve_07_cab_ubicacion' })
export class Ubicacion extends BaseEntity {

    @Column({ name: 'inve07_nombre', unique: true, nullable: false, type: 'varchar', length: 255 })
    nombre: string;

    @Column({ name: 'inve07_direccion', nullable: true, type: 'varchar', length: 500 })
    direccion: string | null;

    // Unidad
    @OneToMany(() => Unidad, (unidad) => unidad.ubicacion)
    productos: Unidad[]

    static fromId(id: number) {
        const producto = new Ubicacion();
        producto.id = id;
        return producto;
    }

}