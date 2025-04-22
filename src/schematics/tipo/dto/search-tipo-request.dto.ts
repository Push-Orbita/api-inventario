import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';


export class SearchTipoRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'ID de tipo a buscar', type: Number, required: false })
    @IsNumber()
    @IsOptional()
    id: number;

    @ApiProperty({ description: 'Nombre del tipo a buscar', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre: string;

    @ApiProperty({ description: 'Descripción del tipo a buscar', required: false })
    @IsString()
    @IsOptional()
    descripcion: string;

}