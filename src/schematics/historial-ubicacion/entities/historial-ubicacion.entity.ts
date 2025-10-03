import { BaseEntity } from "src/common/models/baseEntity";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Ubicacion } from "src/schematics/ubicacion/entities/ubicacion.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'inve_09_hist_ubicacion' })
export class HistorialUbicacion extends BaseEntity {

  // ID DE AUTH: usuario que registra el cambio de ubicación
  @Column({ name: 'user_auth_id', type: 'integer' })
  user: number;

  // Fecha del cambio de ubicación
  @Column({ name: 'inve09_fecha_cambio', type: 'datetime', nullable: false })
  fechaCambio: Date;

  // Motivo del cambio de ubicación
  @Column({ name: 'inve09_motivo', nullable: true, type: 'varchar', length: 500 })
  motivo: string;

  // Ubicación anterior (nullable para la primera ubicación)
  @ManyToOne(() => Ubicacion, { nullable: true })
  @JoinColumn({ name: 'rela_ubicacion_anterior' })
  ubicacionAnterior: Ubicacion | null;

  // Ubicación nueva
  @ManyToOne(() => Ubicacion)
  @JoinColumn({ name: 'rela_ubicacion_nueva' })
  ubicacionNueva: Ubicacion;

  // Unidad
  @ManyToOne(() => Unidad)
  @JoinColumn({ name: 'rela_inve06' })
  unidad: Unidad;

  static fromId(id: number) {
    const historial = new HistorialUbicacion();
    historial.id = id;
    return historial;
  }
}
