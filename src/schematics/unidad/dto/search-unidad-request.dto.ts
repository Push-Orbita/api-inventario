import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoEstadoEnum } from "src/common/enums/tipo-estado.enum";
import { BaseSearchDto } from 'src/common/dto/base-search.dto';

export class SearchUnidadRequestDto extends BaseSearchDto {

  @ApiProperty({ description: 'Número de serie de la unidad', type: String, required: false })
  @IsString()
  @IsOptional()
  numero_serie?: string;

  @ApiProperty({ description: 'Código de la unidad generado por Órbita', type: String, required: false })
  @IsString()
  @IsOptional()
  codigo?: string;

  @ApiProperty({ description: 'Código de barra asociado a la unidad', type: String, required: false })
  @IsString()
  @IsOptional()
  cod_barra?: string;

  @ApiProperty({ description: 'Fecha de adquisición', type: Date, required: false })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaAdquisicion?: Date;

  @ApiProperty({ description: 'Estado actual de la unidad', enum: TipoEstadoEnum, required: false })
  @IsEnum(TipoEstadoEnum)
  @IsOptional()
  estado?: TipoEstadoEnum;

  @ApiProperty({ description: 'ID del producto relacionado', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  producto?: number;

  @ApiProperty({ description: 'ID de la ubicación actual', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  ubicacion?: number;

  @ApiProperty({ description: 'Cantidad de resultados a devolver', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({ description: 'Cantidad de resultados a omitir', type: Number, required: false })
  @IsNumber()
  @IsOptional()
  offset?: number;
}
