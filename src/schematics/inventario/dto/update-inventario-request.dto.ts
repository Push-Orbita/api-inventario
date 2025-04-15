import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInventarioRequestDto {

    @ApiProperty({ description: 'Codigo del inventario', type: String, required: false })
    @IsString()
    @IsOptional()
    codigo: string;

    @ApiProperty({ description: 'Nombre del inventario', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

    @ApiProperty({ description: 'Modelo del inventario', type: String, required: false })
    @IsString()
    @IsOptional()
    modelo: string;
}
