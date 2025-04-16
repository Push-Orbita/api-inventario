import { BaseEntity } from "src/common/baseEntity";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({ name: 'inve_01_cab_inventario' })
export class Inventario extends BaseEntity {

    @Column({ name: 'inve01_codigo', unique: true, nullable: false })
    codigo: string;

    @Column({ name: 'inve01_nombre', unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'inve01_modelo' })
    modelo: string;

    @OneToMany(() => Unidad, (unidad) => unidad.inventario, { cascade: true })
    unidades: Unidad[];

    static fromId(id: number) {
        const inventario = new Inventario();
        inventario.id = id;
        return inventario;
    }

}