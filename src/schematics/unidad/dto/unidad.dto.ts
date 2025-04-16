import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";
import { TipoEstadoEnum } from "src/common/enums/tipo-estado.enum";
import { InventarioDTO } from "src/schematics/inventario/dto/inventario.dto";


export class UnidadDTO extends CommonDTO {

    @ApiProperty({ description: 'Numero de serie de la unidad', type: String })
    @Expose()
    numeroSerie: string;


    @ApiProperty({ description: 'Estado de la unidad', enum: TipoEstadoEnum })
    @Expose()
    estado: TipoEstadoEnum;


    @ApiProperty({ description: 'Ubicacion actual de la unidad', type: String })
    @Expose()
    ubicacionActual: string;


    @ApiProperty({ description: 'ID del inventario de la unidad', type: () => InventarioDTO })
    @Type(() => InventarioDTO)
    @Expose()
    inventario: InventarioDTO

}