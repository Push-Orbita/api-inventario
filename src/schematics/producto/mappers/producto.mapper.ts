import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PageDto } from 'src/common/dto/page.dto';
import { Producto } from '../entities/producto.entity';
import { ProductoDTO } from '../dto/producto.dto';
import { CreateProductoRequestDto } from '../dto/create-producto-request.dto';
import { UpdateProductoRequestDto } from '../dto/update-producto-request.dto';
import { SearchProductoRequestDto } from '../dto/search-producto-request.dto';

import { Modelo } from 'src/schematics/modelo/entities/modelo.entity';
import { Marca } from 'src/schematics/marca/entities/marca.entity';
import { Tipo } from 'src/schematics/tipo/entities/tipo.entity';
import { Categoria } from 'src/schematics/categoria/entities/categoria.entity';


@Injectable()
export class ProductoMapper {

  constructor() {}

  async entity2DTO(producto: Producto): Promise<ProductoDTO> {
    const productoDTO = plainToInstance(ProductoDTO, producto, {
      excludeExtraneousValues: true // filtra propiedades que no tengan el decorador @Expose en el DTO
    });
    return productoDTO;
  }

  async page2Dto(request: SearchProductoRequestDto, page: PageDto<Producto>): Promise<PageDto<ProductoDTO>> {
    const dtos = await Promise.all(
      page.data.map(async (producto) => {
        return this.entity2DTO(producto);
      }),
    );
    const pageDto = new PageDto<ProductoDTO>(dtos, page.metadata.count);
    pageDto.metadata.setPaginationData(1, 10);
    pageDto.metadata.sortBy = request.sortBy;
    return pageDto;
  }

  async createDTO2Entity(request: CreateProductoRequestDto): Promise<Producto> {
    const newProducto: Producto = new Producto();
    newProducto.nombre = request.nombre;
    newProducto.caracteristicas = request.caracteristicas;
    newProducto.modelo = Modelo.fromId(request.modelo);
    newProducto.marca = Marca.fromId(request.marca);
    newProducto.tipo = Tipo.fromId(request.tipo);
    newProducto.categoria = Categoria.fromId(request.categoria);
    return newProducto;
  }

  async updateDTO2Entity(editProducto: Producto, request: UpdateProductoRequestDto): Promise<Producto> {
    request.nombre ? (editProducto.nombre = request.nombre) : null;
    request.caracteristicas ? (editProducto.caracteristicas = request.caracteristicas) : null;
    request.modelo ? (editProducto.modelo = Modelo.fromId(request.modelo)) : null;
    request.marca ? (editProducto.marca = Marca.fromId(request.marca)) : null;
    request.tipo ? (editProducto.tipo = Tipo.fromId(request.tipo)) : null;
    request.categoria ? (editProducto.categoria = Categoria.fromId(request.categoria)) : null;
    return editProducto;
  }
}