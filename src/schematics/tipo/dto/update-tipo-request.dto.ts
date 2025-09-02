import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTipoRequestDto {

    @ApiProperty({ description: 'Nombre del tipo', type: String, nullable: false })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ description: 'Descripción del tipo', type: String, nullable: true })
    @IsString()
    @IsOptional()
    descripcion?: string;
}
