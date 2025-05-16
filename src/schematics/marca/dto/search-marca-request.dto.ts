import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchMarcaRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de la marca a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'Nombre de la marca a buscar', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

}