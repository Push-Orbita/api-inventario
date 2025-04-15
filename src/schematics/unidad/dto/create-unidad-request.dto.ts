import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TipoEstadoEnum } from "src/common/enums/tipo-estado.enum";


export class CreateUnidadRequestDto {

    @ApiProperty({ description: 'Numero de serie de la unidad', type: String })
    @IsString()
    @IsNotEmpty()
    numeroSerie: string;

    @ApiProperty({ description: 'Estado de la unidad', enum: TipoEstadoEnum })
    @IsEnum(TipoEstadoEnum)
    estado: TipoEstadoEnum;

    @ApiProperty({ description: 'Ubicacion actual de la unidad', type: String })
    @IsString()
    @MinLength(3)
    ubicacionActual: string;

}