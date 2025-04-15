import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseSearchDto } from 'src/common/dto/base-search.dto';
import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';


export class SearchUnidadRequestDto extends BaseSearchDto {

    @ApiProperty({ description: 'Numero de serie de la unidad', required: false })
    @IsString()
    @IsOptional()
    numeroSerie: string;


    @ApiProperty({ description: 'Estado de la Unidad', required: false })
    @IsEnum(TipoEstadoEnum)
    @IsOptional()
    estado: TipoEstadoEnum;


    @ApiProperty({ description: 'Ubicacion actual de la Unidad', required: false })
    @IsString()
    @IsOptional()
    ubicacionActual: string;

}