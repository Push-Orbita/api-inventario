import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { CommonDTO } from "src/common/dto/common.dto";

import { ProductoDTO } from "src/schematics/producto/dto/producto.dto";
import { HistorialUbicacionDTO } from "src/schematics/historial-ubicacion/dto/historial-ubicacion.dto";

import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';


export class UnidadDTO extends CommonDTO {

  @ApiProperty({ description: 'Numero de serie originario del Producto ', type: String, required: false })
  @Expose()
  numero_serie: string;

  @ApiProperty({ description: 'Codigo originado por Orbita', type: String, required: false })
  @Expose()
  codigo_com: string;

  @ApiProperty({ description: 'Codigo de barra que permite escanear producto con artefacto', type: String, required: true })
  @Expose()
  cod_barra: string

  @ApiProperty({ description: 'Fecha de adquisición de la Unidad', type: Date })
  @Expose()
  fechaAdquisicion: Date;

  @ApiProperty({ description: 'Estado de la unidad', enum: TipoEstadoEnum, required: true, example: TipoEstadoEnum.DISPONIBLE })
  @Expose()
  estado: TipoEstadoEnum;

  @ApiProperty({ description: 'ID del Producto', type: () => ProductoDTO })
  @Type(() => ProductoDTO)
  @Expose()
  producto: ProductoDTO;

  @ApiProperty({ description: 'Historial de ubicaciones de la unidad', type: () => [HistorialUbicacionDTO] })
  @Type(() => HistorialUbicacionDTO)
  @Expose()
  historialUbicaciones: HistorialUbicacionDTO[];
  
}