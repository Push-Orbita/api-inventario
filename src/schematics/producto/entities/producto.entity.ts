import { BaseEntity } from "src/common/baseEntity";
import { Categoria } from "src/schematics/categoria/entities/categoria.entity";
import { Marca } from "src/schematics/marca/entities/marca.entity";
import { Modelo } from "src/schematics/modelo/entities/modelo.entity";
import { Tipo } from "src/schematics/tipo/entities/tipo.entity";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity({ name: 'inve_01_cab_producto' })
export class Producto extends BaseEntity {

    @Column({ name: 'inve01_nombre', unique: true, nullable: false })
    nombre: string;

    @Column({ name: 'inve01_caracteristicas', nullable: true })
    caracteristicas: string;

    // RELACIONES:

    // Modelo
    @ManyToOne(() => Modelo)
    @JoinColumn({ name: 'rela_inve02' })
    modelo: Modelo;

    // Marca
    @ManyToOne(() => Marca)
    @JoinColumn({ name: 'rela_inve03' })
    marca: Marca;

    // Tipo
    @ManyToOne(() => Tipo)
    @JoinColumn({ name: 'rela_inve04' })
    tipo: Tipo;

    // Categoria
    @ManyToOne(() => Categoria )
    @JoinColumn({ name: 'rela_inve05' })
    categoria: Categoria;

    // Unidad
    @OneToMany(() => Unidad, (unidad) => unidad.producto)

    static fromId(id: number) {
        const producto = new Producto();
        producto.id = id;
        return producto;
    }

}