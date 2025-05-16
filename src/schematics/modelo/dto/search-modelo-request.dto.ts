import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchModeloRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de modelo a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    id: number;

    @ApiProperty({ description: 'Nombre del modelo a buscar', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

}