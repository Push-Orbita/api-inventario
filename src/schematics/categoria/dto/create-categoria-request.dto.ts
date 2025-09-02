import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateCategoriaRequestDto {

    @ApiProperty({ description: 'Nombre de la categoria', type: String, required: true })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Descripción de la categoria', type: String, required: false })
    @IsString()
    @IsOptional()
    descripcion?: string;
    
}