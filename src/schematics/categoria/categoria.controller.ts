import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CategoriaDTO } from './dto/categoria.dto';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaRequestDto } from './dto/create-categoria-request.dto';
import { UpdateCategoriaRequestDto } from './dto/update-categoria-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchCategoriaRequestDto } from './dto/search-categoria-request.dto';


@ApiTags('Categoria')
@Controller('categoria')
export class CategoriaController {

  constructor(private readonly marcaService: CategoriaService) { }

  
  @Get('search')
  @ApiOperation({
    summary: 'Buscar marcas',
    description:
      'Permite buscar marcas según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de marcas encontrada.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchCategoriaRequestDto): Promise<PageDto<CategoriaDTO>> {
    const req = plainToInstance(SearchCategoriaRequestDto, request);
    return await this.marcaService.searchCategoria(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoria',
    description: 'Permite crear una nueva categoria con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateCategoriaRequestDto,
    description: 'Datos de la nueva categoria a crear.',
  })
  @ApiOkResponse({
    type: CategoriaDTO,
    description: 'Categoria creada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createCategoriaRequestDto: CreateCategoriaRequestDto): Promise<CategoriaDTO> {
    return this.marcaService.create(createCategoriaRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de una categoria',
    description: 'Obtiene los detalles de una categoria específica mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la categoria'
  })
  @ApiOkResponse({
    type: CategoriaDTO,
    description: 'Detalles de la categoria obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'categoria no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoriaDTO> {
    return this.marcaService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una categoria existente',
    description: 'Permite actualizar los datos de una categoria existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la categoria a actualizar.',
  })
  @ApiBody({
    type: UpdateCategoriaRequestDto,
    description: 'Datos nuevos de la categoria.',
  })
  @ApiOkResponse({
    type: CategoriaDTO,
    description: 'categoria actualizada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'categoria no encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoriaRequestDto: UpdateCategoriaRequestDto): Promise<CategoriaDTO> {
    return this.marcaService.update(id, updateCategoriaRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una categoria',
    description: 'Permite eliminar una categoria existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la categoria a eliminar.',
  })
  @ApiOkResponse({ description: 'categoria eliminada correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'categoria no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marcaService.remove(id);
  }

}
