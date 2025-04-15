import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { InventarioDTO } from './dto/inventario.dto';
import { InventarioService } from './inventario.service';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchInventarioRequestDto } from './dto/search-inventario-request.dto';
import { plainToInstance } from 'class-transformer';


@ApiTags('Inventario')
@Controller('inventario')
export class InventarioController {

  constructor(private readonly inventarioService: InventarioService) { }

  
  @Get('search')
  @ApiOperation({
    summary: 'Buscar inventarios',
    description:
      'Permite buscar inventarios según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de inventarios encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchInventarioRequestDto): Promise<PageDto<InventarioDTO>> {
    const req = plainToInstance(SearchInventarioRequestDto, request);
    return await this.inventarioService.searchInventario(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo inventario',
    description: 'Permite crear un nuevo inventario con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateInventarioRequestDto,
    description: 'Datos del nuevo inventario a crear.',
  })
  @ApiOkResponse({
    type: InventarioDTO,
    description: 'Inventario creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createInventarioRequestDto: CreateInventarioRequestDto): Promise<InventarioDTO> {
    return this.inventarioService.create(createInventarioRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de un inventario',
    description: 'Obtiene los detalles de un inventario específico mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del inventario'
  })
  @ApiOkResponse({
    type: InventarioDTO,
    description: 'Detalles del inventario obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Inventario no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<InventarioDTO> {
    return this.inventarioService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un inventario existente',
    description: 'Permite actualizar los datos de un inventario existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del inventario a actualizar.',
  })
  @ApiBody({
    type: UpdateInventarioRequestDto,
    description: 'Datos nuevos del inventario.',
  })
  @ApiOkResponse({
    type: InventarioDTO,
    description: 'Inventario actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Inventario no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateInventarioRequestDto: UpdateInventarioRequestDto): Promise<InventarioDTO> {
    return this.inventarioService.update(id, updateInventarioRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un inventario',
    description: 'Permite eliminar un inventario existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del inventario a eliminar.',
  })
  @ApiOkResponse({ description: 'inventario eliminado correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'inventario no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventarioService.remove(id);
  }

}
