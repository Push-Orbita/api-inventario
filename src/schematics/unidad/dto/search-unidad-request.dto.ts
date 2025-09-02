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
  codigo_com?: string;

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

}
