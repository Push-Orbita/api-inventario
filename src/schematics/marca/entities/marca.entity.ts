import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { Producto } from "src/schematics/producto/entities/producto.entity";


@Entity({ name: 'inve_03_cab_marca' })
export class Marca extends BaseEntity {

    @Column({ name: 'inve03_nombre', nullable: false, type: 'varchar', length: 255 })
    nombre: string;

    @OneToMany(() => Producto, (producto) => producto.marca)
    productos: Producto[];

    static fromId(id: number) {
        const producto = new Marca();
        producto.id = id;
        return producto;
    }

}