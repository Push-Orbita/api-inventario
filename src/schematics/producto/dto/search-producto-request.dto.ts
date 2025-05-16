import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchProductoRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de Producto a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'Nombre del producto', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

    @ApiProperty({ description: 'Caracteristicas del producto', required: false })
    @IsString()
    @IsOptional()
    caracteristicas: string;


    @ApiProperty({ description: 'ID del modelo', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    modelo: number;

    @ApiProperty({ description: 'ID de la marca', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    marca: number;

    @ApiProperty({ description: 'ID del tipo de producto', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    tipo: number;

    @ApiProperty({ description: 'ID de la categoría', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    categoria: number;
}