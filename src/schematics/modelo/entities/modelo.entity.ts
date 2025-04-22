import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/baseEntity";
import { Producto } from "src/schematics/producto/entities/producto.entity";


@Entity({ name: 'inve_02_cab_modelo' })
export class Modelo extends BaseEntity {

    @Column({ name: 'inve02_nombre', unique: true, nullable: false })
    nombre: string;

    @OneToMany(() => Producto, (producto) => producto.modelo)
    productos: Producto[];

    static fromId(id: number) {
        const producto = new Modelo();
        producto.id = id;
        return producto;
    }

}