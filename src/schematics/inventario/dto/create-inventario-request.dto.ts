import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateInventarioRequestDto {

    @ApiProperty({ description: 'Codigo del inventario', type: String, required: true })
    @IsString()
    @IsNotEmpty()
    codigo: string;

    @ApiProperty({ description: 'Nombre del inventario', type: String })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Modelo del inventario', type: String })
    @IsString()
    modelo: string;
    
}