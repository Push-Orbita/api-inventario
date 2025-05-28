import { BaseEntity } from "src/common/models/baseEntity";
import { TipoEstadoEnum } from "src/common/enums/tipo-estado.enum";
import { Movimiento } from "src/schematics/movimiento/entities/movimiento.entity";
import { Producto } from "src/schematics/producto/entities/producto.entity";
import { Ubicacion } from "src/schematics/ubicacion/entities/ubicacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity({ name: 'inve_06_det_unidad' })
export class Unidad extends BaseEntity{

    @Column({ name: 'inve06_numero_serie', unique: true, nullable: true })
    numero_serie: string

    @Column({ name: 'inve06_codigo', unique: true, nullable: true }) // de momento lo colamos como nullable
    codigo_com: string

    @Column({ name: 'inve06_cod_barra', unique: true, nullable: true })
    cod_barra: string

    @Column({ name: 'inve06_fecha_adquisicion' })
    fechaAdquisicion: Date;

    @Column({ name: 'inve06_estado', type: 'enum', enum: TipoEstadoEnum, nullable: false })
    estado: TipoEstadoEnum;

    // RELACIONES:

    // Producto
    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'rela_inve01' })
    producto: Producto;

    // Ubicacion
    @ManyToOne(() => Ubicacion)
    @JoinColumn({ name: 'rela_inve07' })
    ubicacion: Ubicacion;

    // Movimientos
    @OneToMany(() => Movimiento, (movimiento) => movimiento.unidad)
    movimientos: Movimiento[]
    
    static fromId(id: number) {
        const unidad = new Unidad();
        unidad.id = id;
        return unidad;
    }
}