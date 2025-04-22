import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateUbicacionRequestDto {

    @ApiProperty({ description: 'Nombre de la ubicación', type: String, nullable: false })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Dirección de la ubicación', type: String, nullable: true })
    @IsString()
    direccion: string;
    
}