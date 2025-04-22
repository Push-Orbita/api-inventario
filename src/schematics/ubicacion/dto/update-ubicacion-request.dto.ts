import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUbicacionRequestDto {

    @ApiProperty({ description: 'Nombre de la ubicación', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

    @ApiProperty({ description: 'Dirección de la ubicación', type: String, required: false })
    @IsString()
    @IsOptional()
    direccion: string;
}
