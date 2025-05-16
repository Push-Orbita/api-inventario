import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from './dto/update-unidad-request.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/dto/page.dto';
import { SearchUnidadRequestDto } from './dto/search-unidad-request.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Unidad')
@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Buscar unidad',
    description:
        'Permite buscar unidades según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: PageDto,
    description: 'Lista paginada de unidades encontradas.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchUnidadRequestDto): Promise<PageDto<UnidadDTO>> {
    const req = plainToInstance(SearchUnidadRequestDto, request);
    return await this.unidadService.searchUnidad(req);
  }

  @Post()
  @ApiOperation({
      summary: 'Crear una nueva unidad',
      description: 'Permite crear una nueva unidad con los datos proporcionados.',
    })
    @ApiBody({
      type: CreateUnidadRequestDto,
      description: 'Datos de la nueva unidad a crear.',
    })
    @ApiOkResponse({
      type: UnidadDTO,
      description: 'Unidad creada correctamente.',
    })
    @ApiBadRequestResponse({
      description: 'Solicitud incorrecta o datos inválidos.',
    })
  create(@Body() createUnidadRequestDto: CreateUnidadRequestDto): Promise<UnidadDTO> {
    return this.unidadService.create(createUnidadRequestDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de una unidad',
    description: 'Obtiene los detalles de una unidad en específico mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id de la unidad',
    type: 'number',
  })
  @ApiOkResponse({
    type: UnidadDTO,
    description: 'Detalles de la unidad obtenidos correctamente.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Unidad no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UnidadDTO> {
    return this.unidadService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una unidad existente',
    description: 'Permite actualizar los datos de una unidad existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la unidad a actualizar.',
  })
  @ApiBody({
    type: UpdateUnidadRequestDto,
    description: 'Datos de la unidad a actualizar.',
  })
  @ApiOkResponse({
    type: UnidadDTO,
    description: 'Unidad actualizada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  @ApiNotFoundResponse({
    description: 'Unidad no encontrada.',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUnidadRequestDto: UpdateUnidadRequestDto): Promise<UnidadDTO> {
    return this.unidadService.update(id, updateUnidadRequestDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una unidad existente',
    description: 'Permite eliminar una unidad existente mediante su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la unidad a eliminar.',
  })
  @ApiOkResponse({
    description: 'Unidad eliminada correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta.',
  })
  @ApiNotFoundResponse({
    description: 'Unidad no encontrada.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadService.remove(id);
  }

}
