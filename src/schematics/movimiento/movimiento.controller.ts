import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { MovimientoDTO } from './dto/movimiento.dto';
import { SearchMovimientoRequestDto } from './dto/search-movimiento-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { GetUser } from 'src/common/decorators/user.decorator';

@ApiTags('Movimiento')
@Controller('movimiento')
export class MovimientoController {

  constructor(private readonly movimientoService: MovimientoService) {}

  @Get('search')
  @ApiOperation({
    summary: 'Buscar movimientos',
    description: 'Permite buscar movimientos según los criterios especificados en la solicitud.',
  })
  @ApiOkResponse({
    type: MovimientoDTO,
    description: 'Lista de movimientos encontrados.',
  })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  async search(@Query() request: SearchMovimientoRequestDto): Promise<PageDto<MovimientoDTO>> {
    const req = plainToInstance(SearchMovimientoRequestDto, request);
    return await this.movimientoService.searchMovimiento(req);
  }




  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo movimiento',
    description: 'Permite registrar un movimiento que a tenido alguna Unidad.',
  })
  @ApiBody({
    type: CreateMovimientoRequestDto,
    description: 'Datos del nuevo movimiento a crear.',
  })
  @ApiOkResponse({
    type: MovimientoDTO,
    description: 'Movimiento creado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  create(@Body() createMovimientoRequestDto: CreateMovimientoRequestDto, @GetUser('userId') persona: number): Promise<MovimientoDTO> {
    return this.movimientoService.create(createMovimientoRequestDto);
  }


  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un movimiento por ID',
    description: 'Permite obtener un movimiento específico utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del movimiento a buscar',
  })
  @ApiOkResponse({
    type: MovimientoDTO,
    description: 'Movimiento encontrado.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o movimiento no encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Movimiento no encontrado.',
  })
  findOne(@Param('id',ParseIntPipe) id: number): Promise<MovimientoDTO> {
    return this.movimientoService.findById(id);
  }



  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un movimiento existente',
    description: 'Permite actualizar los datos de un movimiento existente utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del movimiento a actualizar.',
  })
  @ApiBody({
    type: UpdateMovimientoRequestDto,
    description: 'Datos del movimiento a actualizar.',
  })
  @ApiOkResponse({
    type: MovimientoDTO,
    description: 'Movimiento actualizado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o movimiento no encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Movimiento no encontrado.',
  })
  update(@Param('id') id: number, @Body() updateMovimientoDto: UpdateMovimientoRequestDto) {
    return this.movimientoService.update(id, updateMovimientoDto);
  }


  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un movimiento existente',
    description: 'Permite eliminar un movimiento existente utilizando su ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del movimiento a eliminar.',
  })
  @ApiOkResponse({
    description: 'Movimiento eliminado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o movimiento no encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Movimiento no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(+id);
  }
}
