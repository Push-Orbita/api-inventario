import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMarcaRequestDto {

    @ApiProperty({ description: 'Nombre de la marca', type: String, required: false })
    @IsString()
    @IsOptional()
    nombre?: string;
}
