import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';

export class UpdateUnidadRequestDto {

    @ApiProperty({ description: 'Numero de serie que viene de fabrica', type: String, required: false })
    @IsString()
    @IsOptional()
    numero_serie?: string;

    // @ApiProperty({ description: 'Codigo generado por Órbita', type: String, required: false })
    // @IsString()
    // @IsOptional()
    // codigo_com?: string;

    @ApiProperty({ description: 'Fecha de adquisición de la unidad', type: Date, required: false })
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    fechaAdquisicion?: Date;

    @ApiProperty({ description: 'Codigo de barra pegado en la unidad', type: String, required: false })
    @IsString()
    @IsOptional()
    cod_barra?: string;

    @ApiProperty({ description: 'ID del Producto', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    producto?: number;

    @ApiProperty({ description: 'ID de la Ubicacion', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    ubicacion?: number;

    @ApiProperty({
        description: 'Estado actual de la unidad',
        enum: TipoEstadoEnum,
        required: false,
        example: TipoEstadoEnum.DISPONIBLE,
    })
    @IsEnum(TipoEstadoEnum)
    @IsOptional()
    estado?: TipoEstadoEnum;
}
