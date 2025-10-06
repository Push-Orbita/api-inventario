import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CommonDTO } from "src/common/dto/common.dto";
import { UbicacionDTO } from "src/schematics/ubicacion/dto/ubicacion.dto";

export class HistorialUbicacionDTO extends CommonDTO {

  @ApiProperty({ description: 'ID del usuario que registra el cambio', type: Number })
  @Expose()
  user: number;

  @ApiProperty({ description: 'Fecha del cambio de ubicación', type: Date })
  @Expose()
  fechaCambio: Date;

  @ApiProperty({ description: 'Motivo del cambio de ubicación', type: String, required: false })
  @Expose()
  motivo: string;

  @ApiProperty({ description: 'Ubicación anterior', type: () => UbicacionDTO, required: false })
  @Type(() => UbicacionDTO)
  @Expose()
  ubicacionAnterior: UbicacionDTO | null;

  @ApiProperty({ description: 'Ubicación nueva', type: () => UbicacionDTO })
  @Type(() => UbicacionDTO)
  @Expose()
  ubicacionNueva: UbicacionDTO;
}
