import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class CategoriaDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre de la categoria', type: String, required: true })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Descripción de la categoria', type: String, required: false })
    @Expose()
    descripcion?: string;
}