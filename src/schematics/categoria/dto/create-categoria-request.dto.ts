import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateCategoriaRequestDto {

    @ApiProperty({ description: 'Nombre de la categoria', type: String, nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Descripción de la categoria', type: String, nullable: true })
    @IsString()
    descripcion: string;
    
}