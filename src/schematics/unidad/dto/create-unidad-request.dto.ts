import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';


export class CreateUnidadRequestDto {

  @ApiProperty({ description: 'Numero de serie que viene de fabrica', type: String, required: false })
  @IsString()
  @IsOptional()
  numero_serie: string;

  @ApiProperty({ description: 'Fecha de adquisición de la unidad', type: Date })
  @IsDate()
  @Type(() => Date) // <- esto convierte el string ISO en un objeto Date
  fechaAdquisicion: Date;

  @ApiProperty({ description: 'Codigo de barra pegado en la unidad', type: String, required: false })
  @IsString()
  @IsOptional()
  cod_barra: string

  @ApiProperty({ description: 'ID del del Producto', type: Number })
  @IsNumber()
  producto: number;

  @ApiProperty({
    description: 'Estado actual de la unidad',
    enum: TipoEstadoEnum,
    example: TipoEstadoEnum.DISPONIBLE,
  })
  @IsEnum(TipoEstadoEnum)
  estado: TipoEstadoEnum;

}