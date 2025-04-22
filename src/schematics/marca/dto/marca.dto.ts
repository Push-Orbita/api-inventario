import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class MarcaDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre de la marca', type: String, nullable: false })
    @Expose()
    nombre: string;
}