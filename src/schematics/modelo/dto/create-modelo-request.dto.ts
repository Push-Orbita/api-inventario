import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateModeloRequestDto {

    @ApiProperty({ description: 'Nombre del modelo', type: String, nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
}