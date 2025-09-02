import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoriaRequestDto {

    @ApiProperty({ description: 'Nombre de la categoria', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ description: 'Descripción de la Categoria', required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;
}
