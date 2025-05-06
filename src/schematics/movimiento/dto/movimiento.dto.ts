import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CommonDTO } from "src/common/dto/common.dto";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";
import { UnidadDTO } from "src/schematics/unidad/dto/unidad.dto";


export class MovimientoDTO extends CommonDTO {

  @ApiProperty({ description: 'Nombre de la Persona que realiza el movimiento', type: String, required: true })
  @Expose()
  persona: string;

  @ApiProperty({ description: 'ID de la Unidad', type: () => UnidadDTO })
  @Type(() => UnidadDTO)
  @Expose()
  unidad: UnidadDTO;

  @ApiProperty({ description: 'Fecha del movimiento', type: Date })
  @Expose()
  fecha: Date;

  @ApiProperty({
  description: 'Tipo de la operacion',
  enum: TipoOperacionEnum,
  required: true,
  example: TipoOperacionEnum.ADQUIERE,
  })
  @Expose()
  operacion: TipoOperacionEnum;

  @ApiProperty({ description: 'Detalles o motivo del movimiento', type: String })
  @Expose()
  detalle: string;

}