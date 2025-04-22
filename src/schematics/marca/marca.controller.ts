import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { MarcaDTO } from './dto/marca.dto';
import { MarcaService } from './marca.service';
import { CreateMarcaRequestDto } from './dto/create-marca-request.dto';
import { UpdateMarcaRequestDto } from './dto/update-marca-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchMarcaRequestDto } from './dto/search-marca-request.dto';


@ApiTags('Marca')
@Controller('marca')
export class MarcaController {

  constructor(private readonly marcaService: MarcaService) { }

  
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
  async search(@Query() request: SearchMarcaRequestDto): Promise<PageDto<MarcaDTO>> {
    const req = plainToInstance(SearchMarcaRequestDto, request);
    return await this.marcaService.searchMarca(req);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva marca',
    description: 'Permite crear una nueva marca con los datos proporcionados.',
  })
  @ApiBody({
    type: CreateMarcaRequestDto,
    description: 'Datos de la nueva marca a crear.',
  })
  @ApiOkResponse({
    type: MarcaDTO,
    description: 'Marca creada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createMarcaRequestDto: CreateMarcaRequestDto): Promise<MarcaDTO> {
    return this.marcaService.create(createMarcaRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de una marca',
    description: 'Obtiene los detalles de una marca específica mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la marca'
  })
  @ApiOkResponse({
    type: MarcaDTO,
    description: 'Detalles de la marca obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'marca no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MarcaDTO> {
    return this.marcaService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una marca existente',
    description: 'Permite actualizar los datos de una marca existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la marca a actualizar.',
  })
  @ApiBody({
    type: UpdateMarcaRequestDto,
    description: 'Datos nuevos de la marca.',
  })
  @ApiOkResponse({
    type: MarcaDTO,
    description: 'marca actualizada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({ description: 'marca no encontrada.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMarcaRequestDto: UpdateMarcaRequestDto): Promise<MarcaDTO> {
    return this.marcaService.update(id, updateMarcaRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una marca',
    description: 'Permite eliminar una marca existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la marca a eliminar.',
  })
  @ApiOkResponse({ description: 'marca eliminada correctamente.' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'marca no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.marcaService.remove(id);
  }

}
