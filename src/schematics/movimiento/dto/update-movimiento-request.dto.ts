import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString, IsBoolean } from "class-validator";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";

export class UpdateMovimientoRequestDto {

  @ApiProperty({ description: 'ID de la Persona que realiza el movimiento', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  persona?: number;

  @ApiProperty({ description: 'ID de la Unidad', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  unidad?: number;

  @ApiProperty({ description: 'Fecha del movimiento', type: Date, required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fecha?: Date;

  @ApiProperty({
    description: 'Tipo de la operacion',
    enum: TipoOperacionEnum,
    example: TipoOperacionEnum.ADQUIERE,
    required: false,
  })
  @IsEnum(TipoOperacionEnum)
  @IsOptional()
  operacion?: TipoOperacionEnum;

  @ApiProperty({ description: 'Detalles o motivo del movimiento', type: String, required: false })
  @IsString()
  @IsOptional()
  detalle?: string;

  @ApiProperty({ 
    description: 'Confirmación de recepción (solo para operaciones CEDIÓ)', 
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  confirmado?: boolean;
}
