import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchUbicacionRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de la ubicación a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    id?: number;

    @ApiProperty({ description: 'Nombre de la ubicación a buscar', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ description: 'Dirección de la ubicación a buscar', required: false })
    @IsString()
    @IsOptional()
    direccion?: string;

}