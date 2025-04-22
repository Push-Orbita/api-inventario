import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class CategoriaDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre de la categoria', type: String, nullable: false })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Descripción de la categoria', type: String, nullable: true })
    @Expose()
    descripcion: string;
}