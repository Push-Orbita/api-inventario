import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MovimientoDTO } from './dto/movimiento.dto';

@ApiTags('Movimiento')
@Controller('movimiento')
export class MovimientoController {

  constructor(private readonly movimientoService: MovimientoService) {}

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
  create(@Body() createMovimientoRequestDto: CreateMovimientoRequestDto): Promise<MovimientoDTO> {
    return this.movimientoService.create(createMovimientoRequestDto);
  }

  @Get()
  findAll() {
    return this.movimientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoDto: UpdateMovimientoRequestDto) {
    return this.movimientoService.update(+id, updateMovimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoService.remove(+id);
  }
}
