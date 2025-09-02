import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class TipoDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre del tipo', type: String, nullable: false })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Descripción del tipo', type: String, nullable: true })
    @Expose()
    descripcion?: string
}