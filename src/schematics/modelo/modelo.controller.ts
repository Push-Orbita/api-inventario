import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { ModeloDTO } from './dto/modelo.dto';
import { ModeloService } from './modelo.service';
import { CreateModeloRequestDto } from './dto/create-modelo-request.dto';
import { UpdateModeloRequestDto } from './dto/update-modelo-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchModeloRequestDto } from './dto/search-modelo-request.dto';


@ApiTags('Modelo')
@Controller('modelo')
export class ModeloController {

  constructor(private readonly modeloService: ModeloService) { }

  
  @Get('search')
  @ApiOperation({
    summary: 'Buscar modelos',
    description: 'Permite buscar modelos según los criterios especificados en la solicitud.'})
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de modelos encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchModeloRequestDto): Promise<PageDto<ModeloDTO>> {
    const req = plainToInstance(SearchModeloRequestDto, request);
    return await this.modeloService.searchModelo(req);
  }


  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo modelo',
    description: 'Permite crear un nuevo modelo con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateModeloRequestDto,
    description: 'Datos del nuevo modelo a crear.',
  })
  @ApiOkResponse({
    type: ModeloDTO,
    description: 'Modelo creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createModeloRequestDto: CreateModeloRequestDto): Promise<ModeloDTO> {
    return this.modeloService.create(createModeloRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de un modelo',
    description: 'Obtiene los detalles de un modelo específico mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del modelo'
  })
  @ApiOkResponse({
    type: ModeloDTO,
    description: 'Detalles del modelo obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Modelo no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ModeloDTO> {
    return this.modeloService.findById(id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un modelo existente',
    description: 'Permite actualizar los datos de un modelo existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del modelo a actualizar.',
  })
  @ApiBody({
    type: UpdateModeloRequestDto,
    description: 'Datos nuevos del modelo.',
  })
  @ApiOkResponse({
    type: ModeloDTO,
    description: 'Modelo actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Modelo no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateModeloRequestDto: UpdateModeloRequestDto): Promise<ModeloDTO> {
    return this.modeloService.update(id, updateModeloRequestDto);
  }

  
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un modelo',
    description: 'Permite eliminar un modelo existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del modelo a eliminar.',
  })
  @ApiOkResponse({ description: 'modelo eliminado correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'modelo no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modeloService.remove(id);
  }

}
