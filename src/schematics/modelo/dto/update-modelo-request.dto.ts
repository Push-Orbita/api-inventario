import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateModeloRequestDto {

    @ApiProperty({ description: 'Nombre del modelo', type: String, nullable: false })
    @IsString()
    @IsOptional()
    nombre?: string;
}
