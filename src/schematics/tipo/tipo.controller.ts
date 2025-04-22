import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { TipoDTO } from './dto/tipo.dto';
import { TipoService } from './tipo.service';
import { CreateTipoRequestDto } from './dto/create-tipo-request.dto';
import { UpdateTipoRequestDto } from './dto/update-tipo-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchTipoRequestDto } from './dto/search-tipo-request.dto';


@ApiTags('Tipo')
@Controller('tipo')
export class TipoController {

  constructor(private readonly tipoService: TipoService) { }

  
  @Get('search')
  @ApiOperation({
    summary: 'Buscar tipos',
    description: 'Permite buscar tipos según los criterios especificados en la solicitud.'})
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de tipos encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchTipoRequestDto): Promise<PageDto<TipoDTO>> {
    const req = plainToInstance(SearchTipoRequestDto, request);
    return await this.tipoService.searchTipo(req);
  }


  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo tipo',
    description: 'Permite crear un nuevo tipo con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateTipoRequestDto,
    description: 'Datos del nuevo tipo a crear.',
  })
  @ApiOkResponse({
    type: TipoDTO,
    description: 'Tipo creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createTipoRequestDto: CreateTipoRequestDto): Promise<TipoDTO> {
    return this.tipoService.create(createTipoRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de un tipo',
    description: 'Obtiene los detalles de un tipo específico mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id del tipo'
  })
  @ApiOkResponse({
    type: TipoDTO,
    description: 'Detalles del tipo obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Tipo no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TipoDTO> {
    return this.tipoService.findById(id);
  }


  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un tipo existente',
    description: 'Permite actualizar los datos de un tipo existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del tipo a actualizar.',
  })
  @ApiBody({
    type: UpdateTipoRequestDto,
    description: 'Datos nuevos del tipo.',
  })
  @ApiOkResponse({
    type: TipoDTO,
    description: 'Tipo actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'Tipo no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoRequestDto: UpdateTipoRequestDto): Promise<TipoDTO> {
    return this.tipoService.update(id, updateTipoRequestDto);
  }

  
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un tipo',
    description: 'Permite eliminar un tipo existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del tipo a eliminar.',
  })
  @ApiOkResponse({ description: 'tipo eliminado correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'tipo no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tipoService.remove(id);
  }

}
