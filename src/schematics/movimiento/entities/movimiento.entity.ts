import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";

@Entity({ name: 'inve_08_mov_movimiento' })
export class Movimiento extends BaseEntity {

  // ID DE AUTH
  @Column({ name: 'user_auth_id', type: 'integer' })
  user: number;

  @Column({ name: 'inve08_persona', nullable: false, type: 'integer' })
  persona: number;

  // Fecha de movimiento
  @Column({ name: 'inve08_fecha', type: 'datetime', nullable: true })
  fecha: Date;

  // Operacion
  @Column({ name: 'inve08_operacion', type: 'enum', enum: TipoOperacionEnum, nullable: false })
  operacion: TipoOperacionEnum;

  // Detalle
  @Column({ name: 'inve08_detalle', nullable: true, type: 'varchar', length: 500 })
  detalle: string;

  // Unidad
  @ManyToOne(() => Unidad)
  @JoinColumn({ name: 'rela_inve06' })
  unidad: Unidad;

  static fromId(id: number) {
    const movimiento = new Movimiento();
    movimiento.id = id;
    return movimiento;
  }

}