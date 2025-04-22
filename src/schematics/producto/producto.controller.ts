import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ProductoDTO } from './dto/producto.dto';
import { ProductoService } from './producto.service';
import { CreateProductoRequestDto } from './dto/create-producto-request.dto';
import { UpdateProductoRequestDto } from './dto/update-producto-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchProductoRequestDto } from './dto/search-producto-request.dto';


@ApiTags('Producto')
@Controller('producto')
export class ProductoController {

  constructor(private readonly productoService: ProductoService) { }

  
  
  @Get('search')
  @ApiOperation({
    summary: 'Buscar productos',
    description: 'Permite buscar productos según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de productos encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchProductoRequestDto): Promise<PageDto<ProductoDTO>> {
    const req = plainToInstance(SearchProductoRequestDto, request);
    return await this.productoService.searchProducto(req);
  }



  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Permite crear un nuevo producto con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateProductoRequestDto,
    description: 'Datos del nuevo producto a crear.',
  })
  @ApiOkResponse({
    type: ProductoDTO,
    description: 'Producto creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createProductoRequestDto: CreateProductoRequestDto): Promise<ProductoDTO> {
    return this.productoService.create(createProductoRequestDto);
  }



  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de un producto',
    description: 'Obtiene los detalles de un producto específico mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del producto'
  })
  @ApiOkResponse({
    type: ProductoDTO,
    description: 'Detalles del producto obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductoDTO> {
    return this.productoService.findById(id);
  }



  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un producto existente',
    description: 'Permite actualizar los datos de un producto existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto a actualizar.',
  })
  @ApiBody({
    type: UpdateProductoRequestDto,
    description: 'Datos nuevos del producto.',
  })
  @ApiOkResponse({
    type: ProductoDTO,
    description: 'Producto actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Producto no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductoRequestDto: UpdateProductoRequestDto): Promise<ProductoDTO> {
    return this.productoService.update(id, updateProductoRequestDto);
  }



  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto',
    description: 'Permite eliminar un producto existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del producto a eliminar.',
  })
  @ApiOkResponse({ description: 'producto eliminado correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'producto no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.remove(id);
  }

}
