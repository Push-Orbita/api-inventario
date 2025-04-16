import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';

export class UpdateUnidadRequestDto {

    @ApiProperty({ description: 'Numero de serie de la unidad', type: String })
    @IsString()
    @IsOptional()
    numeroSerie: string;

    @ApiProperty({ description: 'Estado de la unidad', enum: TipoEstadoEnum })
    @IsEnum(TipoEstadoEnum)
    @IsOptional()
    estado: TipoEstadoEnum;

    @ApiProperty({ description: 'Ubicacion actual de la unidad', type: String })
    @IsString()
    @IsOptional()
    ubicacionActual: string;

    @ApiProperty({
        description: 'ID del inventario de la unidad',
        type: Number,
    })
    @IsNumber()
    @IsOptional()
    inventario: number;
}
