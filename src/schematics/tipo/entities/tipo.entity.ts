import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { Producto } from "src/schematics/producto/entities/producto.entity";


@Entity({ name: 'inve_04_cab_tipo' })
export class Tipo extends BaseEntity {

    @Column({ name: 'inve04_nombre', nullable: false, type: 'varchar', length: 255 })
    nombre: string;

    @Column({ name: 'inve04_descripcion', nullable: true, type: 'varchar', length: 500 })
    descripcion: string | null;

    @OneToMany(() => Producto, (producto) => producto.tipo)
    productos: Producto[];

    static fromId(id: number) {
        const producto = new Tipo();
        producto.id = id;
        return producto;
    }

}