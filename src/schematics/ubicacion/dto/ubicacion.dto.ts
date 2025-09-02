import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class UbicacionDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre de la ubicación', type: String, nullable: false })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Dirección de la ubicación', type: String, nullable: true })
    @Expose()
    direccion?: string;
}