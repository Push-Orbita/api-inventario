import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class InventarioDTO extends CommonDTO {

    @ApiProperty({ description: 'Codigo del inventario', type: String, required: true })
    @Expose()
    codigo: string;

    @ApiProperty({ description: 'Nombre del inventario', type: String })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Modelo del inventario', type: String })
    @Expose()
    modelo: string;

}