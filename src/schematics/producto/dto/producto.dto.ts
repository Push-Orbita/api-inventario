import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { CommonDTO } from "src/common/dto/common.dto";
import { CategoriaDTO } from "src/schematics/categoria/dto/categoria.dto";
import { MarcaDTO } from "src/schematics/marca/dto/marca.dto";
import { ModeloDTO } from "src/schematics/modelo/dto/modelo.dto";
import { TipoDTO } from "src/schematics/tipo/dto/tipo.dto";


export class ProductoDTO extends CommonDTO {

    @ApiProperty({ description: 'Nombre del producto', type: String, required: true })
    @Expose()
    nombre: string;

    @ApiProperty({ description: 'Caracteristicas del producto', type: String })
    @Expose()
    caracteristicas: string;

    @ApiProperty({ description: 'ID del modelo del producto', type: () => ModeloDTO, required: false })
    @Type(() => ModeloDTO)
    @Expose()
    modelo?: ModeloDTO;

    @ApiProperty({ description: 'ID de la marca del producto', type: () => MarcaDTO })
    @Type(() => MarcaDTO)
    @Expose()
    marca: MarcaDTO;

    @ApiProperty({ description: 'ID del tipo de producto', type: () => TipoDTO })
    @Type(() => TipoDTO)
    @Expose()
    tipo: TipoDTO;

    @ApiProperty({ description: 'ID de la categoría del producto', type: () => CategoriaDTO })
    @Type(() => CategoriaDTO)
    @Expose()
    categoria: CategoriaDTO;

}