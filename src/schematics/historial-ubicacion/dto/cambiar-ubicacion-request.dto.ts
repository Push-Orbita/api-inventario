import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CambiarUbicacionRequestDto {

    userId: number;

    @ApiProperty({ description: 'ID de la Unidad', type: Number, required: true })
    @IsNumber()
    @IsNotEmpty()
    unidadId: number;

    @ApiProperty({ description: 'ID de la nueva Ubicación', type: Number, required: true })
    @IsNumber()
    @IsNotEmpty()
    nuevaUbicacionId: number;

    @ApiProperty({ description: 'Fecha del cambio de ubicación', type: Date })
    @IsDate()
    @Type(() => Date)
    fechaCambio: Date;

    @ApiProperty({ 
        description: 'Motivo del cambio de ubicación', 
        type: String,
        required: false
    })
    @IsOptional()
    @IsString()
    motivo?: string;
}
