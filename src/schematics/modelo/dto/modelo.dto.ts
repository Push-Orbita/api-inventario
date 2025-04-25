import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";

// datos que quiero exponer al cliente (frontend)
export class ModeloDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre del modelo', type: String, nullable: false })
    @Expose()
    nombre: string;
}