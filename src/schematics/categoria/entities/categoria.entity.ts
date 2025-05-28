import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { Producto } from "src/schematics/producto/entities/producto.entity";


@Entity({ name: 'inve_05_cab_categoria' })
export class Categoria extends BaseEntity {

    @Column({ name: 'inve05_nombre', unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'inve05_descripcion', nullable: true })
    descripcion: string;

    @OneToMany(() => Producto, (producto) => producto.categoria)
    productos: Producto[];

    static fromId(id: number) {
        const producto = new Categoria();
        producto.id = id;
        return producto;
    }

}