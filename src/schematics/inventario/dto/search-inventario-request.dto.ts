import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchInventarioRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'Codigo del Inventario', required: false })
    @IsString()
    @IsOptional()
    codigo: string;


    @ApiProperty({ description: 'Nombre del Inventario', required: false })
    @IsString()
    @IsOptional()
    nombre: string;


    @ApiProperty({ description: 'Modelo del Inventario', required: false })
    @IsString()
    @IsOptional()
    modelo: string;

}