import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { HistorialUbicacion } from "src/schematics/historial-ubicacion/entities/historial-ubicacion.entity";


@Entity({ name: 'inve_07_cab_ubicacion' })
export class Ubicacion extends BaseEntity {

    @Column({ name: 'inve07_nombre', unique: true, nullable: false, type: 'varchar', length: 255 })
    nombre: string;

    @Column({ name: 'inve07_direccion', nullable: true, type: 'varchar', length: 500 })
    direccion: string | null;

    // Historial de Ubicaciones (como ubicación anterior)
    @OneToMany(() => HistorialUbicacion, (historial) => historial.ubicacionAnterior)
    historialComoAnterior: HistorialUbicacion[];

    // Historial de Ubicaciones (como ubicación nueva)
    @OneToMany(() => HistorialUbicacion, (historial) => historial.ubicacionNueva)
    historialComoNueva: HistorialUbicacion[];

    static fromId(id: number) {
        const producto = new Ubicacion();
        producto.id = id;
        return producto;
    }

}