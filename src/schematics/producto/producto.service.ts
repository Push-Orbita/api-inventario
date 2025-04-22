import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { ProductoMapper } from './mappers/producto.mapper';
import { ProductoRepository } from './repository/producto-repository';

import { PageDto } from 'src/common/dto/page.dto';
import { ProductoDTO } from './dto/producto.dto';
import { CreateProductoRequestDto } from './dto/create-producto-request.dto';
import { UpdateProductoRequestDto } from './dto/update-producto-request.dto';
import { SearchProductoRequestDto } from './dto/search-producto-request.dto';


@Injectable()
export class ProductoService {

  constructor(

    private readonly productoMapper: ProductoMapper,
    private readonly productoRepository: ProductoRepository,

  ) { }

  public async create(request: CreateProductoRequestDto): Promise<ProductoDTO> {
    try {
      const newProducto = await this.productoMapper.createDTO2Entity(request);
      await this.productoRepository.save(newProducto);
      const productoSaved = await this.productoMapper.entity2DTO(newProducto);
      return productoSaved;
    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Producto: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<ProductoDTO> {
    try {

      const producto = await this.productoRepository.findOne({
        where: { id: id }
      });

      if (!producto) {
        throw new NotFoundException(`No se encontró el producto con id ${id}`);
      }
      return this.productoMapper.entity2DTO(producto);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar producto: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateProductoRequestDto: UpdateProductoRequestDto): Promise<ProductoDTO> {
    try {
      const producto = await this.productoRepository.findOne({ where: { id: id } });
      if (!producto) throw new NotFoundException(`No se encontró el producto con id ${id}`);
      const updateProducto = await this.productoMapper.updateDTO2Entity(producto, updateProductoRequestDto);
      await this.productoRepository.save(updateProducto);
      const productoUpdate = await this.productoMapper.entity2DTO(updateProducto);
      return productoUpdate;
    } catch (error) {
      throw new BadRequestException(`Error al actualizar producto: ${error.message}`);
    }
  }

  public async remove(id: number) {

    const producto = await this.productoRepository.findOne({ where: { id: id } });
    if (!producto) throw new NotFoundException(`No se encontró el producto con id ${id}`);

    try {

      await this.productoRepository.softRemove(producto);
      return `Producto eliminado`;

    } catch (error) {
      throw new BadRequestException(`Error al eliminar producto: ${error.message}`);
    }
  }

  public async searchProducto(request: SearchProductoRequestDto): Promise<PageDto<ProductoDTO>> {
    try {
      const productoPage = await this.productoRepository.search(request);
      return this.productoMapper.page2Dto(request, productoPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar productos: ${error.message}`);
    }
  }
}
