import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";


export class ModeloDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre del modelo', type: String, nullable: false })
    @Expose()
    nombre: string;
}