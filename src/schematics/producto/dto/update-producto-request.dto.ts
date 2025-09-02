import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductoRequestDto {

    @ApiProperty({ description: 'Nombre del producto', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre?: string;
    
    @ApiProperty({ description: 'Caracteristicas del producto', type: String, required: false })
    @IsString()
    @IsOptional()
    caracteristicas?: string;

    @ApiProperty({ description: 'ID de la categoría del producto', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    modelo?: number;

    @ApiProperty({ description: 'ID de la marca del producto', type: Number })
    @IsNumber()
    @IsOptional()
    marca?: number;

    @ApiProperty({ description: 'ID del tipo de producto', type: Number })
    @IsNumber()
    @IsOptional()
    tipo?: number;

    @ApiProperty({ description: 'ID de la categoría del producto', type: Number })
    @IsNumber()
    @IsOptional()
    categoria?: number;
}
