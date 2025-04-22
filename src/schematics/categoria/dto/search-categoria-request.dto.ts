import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchCategoriaRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de la categoria a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ description: 'Nombre de la categoria a buscar', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

    @ApiProperty({ description: 'Descripción de la Categoria para buscar', required: false })
    @IsString()
    @IsOptional()
    descripcion: string;

}