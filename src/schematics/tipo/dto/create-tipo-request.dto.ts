import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTipoRequestDto {

    @ApiProperty({ description: 'Nombre del tipo', type: String, nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Descripción del tipo', type: String, nullable: true })
    @IsString()
    @IsOptional()
    descripcion?: string;
    
}