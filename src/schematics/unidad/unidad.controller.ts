import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UnidadService } from './unidad.service';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from './dto/update-unidad-request.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('unidad')
export class UnidadController {
  constructor(private readonly unidadService: UnidadService) {}

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

  @Get()
  findAll() {
    return this.unidadService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadService.remove(+id);
  }
}
