import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateMarcaRequestDto {

    @ApiProperty({ description: 'Nombre de la marca', type: String, nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
}