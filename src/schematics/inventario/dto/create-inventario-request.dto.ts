import { ApiProperty } from "@nestjs/swagger";


export class CreateInventarioRequestDto {

    @ApiProperty({ description: 'Codigo del inventario', type: String, required: true })
    codigo: string;

    @ApiProperty({ description: 'Nombre del inventario', type: String })
    nombre: string;

    @ApiProperty({ description: 'Modelo del inventario', type: String })
    modelo: string;
    
}