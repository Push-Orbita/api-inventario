import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UbicacionDTO } from './dto/ubicacion.dto';
import { UbicacionService } from './ubicacion.service';
import { CreateUbicacionRequestDto } from './dto/create-ubicacion-request.dto';
import { UpdateUbicacionRequestDto } from './dto/update-ubicacion-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchUbicacionRequestDto } from './dto/search-ubicacion-request.dto';


@ApiTags('Ubicacion')
@Controller('ubicacion')
export class UbicacionController {

  constructor(private readonly marcaService: UbicacionService) { }

  
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
  async search(@Query() request: SearchUbicacionRequestDto): Promise<PageDto<UbicacionDTO>> {
    const req = plainToInstance(SearchUbicacionRequestDto, request);
    return await this.marcaService.searchUbicacion(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva ubicacion',
    description: 'Permite crear una nueva ubicacion con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateUbicacionRequestDto,
    description: 'Datos de la nueva ubicacion a crear.',
  })
  @ApiOkResponse({
    type: UbicacionDTO,
    description: 'Ubicacion creada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createUbicacionRequestDto: CreateUbicacionRequestDto): Promise<UbicacionDTO> {
    return this.marcaService.create(createUbicacionRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de una ubicacion',
    description: 'Obtiene los detalles de una ubicacion específica mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la ubicacion'
  })
  @ApiOkResponse({
    type: UbicacionDTO,
    description: 'Detalles de la ubicacion obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'ubicacion no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UbicacionDTO> {
    return this.marcaService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una ubicacion existente',
    description: 'Permite actualizar los datos de una ubicacion existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la ubicacion a actualizar.',
  })
  @ApiBody({
    type: UpdateUbicacionRequestDto,
    description: 'Datos nuevos de la ubicacion.',
  })
  @ApiOkResponse({
    type: UbicacionDTO,
    description: 'ubicacion actualizada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'ubicacion no encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUbicacionRequestDto: UpdateUbicacionRequestDto): Promise<UbicacionDTO> {
    return this.marcaService.update(id, updateUbicacionRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una ubicacion',
    description: 'Permite eliminar una ubicacion existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la ubicacion a eliminar.',
  })
  @ApiOkResponse({ description: 'ubicacion eliminada correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'ubicacion no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marcaService.remove(id);
  }

}
