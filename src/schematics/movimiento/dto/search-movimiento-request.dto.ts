import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";
import { BaseSearchDto } from "src/common/dto/base-search.dto";

export class SearchMovimientoRequestDto extends BaseSearchDto {

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
  @IsOptional()
  @Type(() => Date)
  fecha?: Date;

  @ApiProperty({
    description: 'Tipo de la operación',
    enum: TipoOperacionEnum,
    required: false,
  })
  @IsEnum(TipoOperacionEnum)
  @IsOptional()
  operacion?: TipoOperacionEnum;

  @ApiProperty({ description: 'Detalles o motivo del movimiento', type: String, required: false })
  @IsString()
  @IsOptional()
  detalle?: string;

  @ApiProperty({ description: 'Cantidad de resultados a devolver', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ description: 'Cantidad de resultados a omitir', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  offset?: number;
}
