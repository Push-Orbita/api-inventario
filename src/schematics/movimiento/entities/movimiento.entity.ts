import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "src/common/models/baseEntity";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";

@Entity({ name: 'inve_08_mov_movimiento' })
export class Movimiento extends BaseEntity {

  // Persona: relación
  @Column({ name: 'inve08_persona', nullable: false })
  persona: number;

  // Fecha de movimiento
  @Column({ name: 'inve08_fecha' })
  fecha: Date;

  // Operacion
  @Column({ name: 'inve08_operacion', type: 'enum', enum: TipoOperacionEnum, nullable: false })
  operacion: TipoOperacionEnum;

  // Detalle
  @Column({ name: 'inve08_detalle', nullable: true })
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