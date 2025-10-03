import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { MovimientoService } from './movimiento.service';
import { MovimientoBulkService } from './services/movimiento-bulk.service';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { CreateBulkMovimientosRequestDto } from './dto/create-bulk-movimientos-request.dto';
import { ConfirmarMovimientoRequestDto } from './dto/confirmar-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { MovimientoDTO } from './dto/movimiento.dto';
import { SearchMovimientoRequestDto } from './dto/search-movimiento-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { plainToInstance } from 'class-transformer';
import { GetUserId } from 'src/common/utils/auth-utils/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Movimiento')
@Controller('movimiento')
export class MovimientoController {

  constructor(
    private readonly movimientoService: MovimientoService,
    private readonly movimientoBulkService: MovimientoBulkService
  ) { }

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
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
  create(
    @Body() createMovimientoRequestDto: CreateMovimientoRequestDto,
    @GetUserId() userId: number
  ): Promise<MovimientoDTO> {
    createMovimientoRequestDto.userId = userId;
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MovimientoDTO> {
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

  @Post('bulk')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Crear múltiples movimientos en lote',
    description: 'Permite registrar múltiples movimientos de unidades en una sola operación.',
  })
  @ApiBody({
    type: CreateBulkMovimientosRequestDto,
    description: 'Datos para crear múltiples movimientos.',
  })
  @ApiOkResponse({
    type: [MovimientoDTO],
    description: 'Movimientos creados correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  async createBulk(
    @Body() createBulkMovimientosDto: CreateBulkMovimientosRequestDto,
    @GetUserId() userId: number
  ): Promise<MovimientoDTO[]> {
    createBulkMovimientosDto.userId = userId;
    const movimientos = await this.movimientoBulkService.crearMovimientosEnLote(createBulkMovimientosDto);
    return this.movimientoService.mapEntitiesToDTOs(movimientos);
  }

  @Patch(':id/confirmar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Confirmar un movimiento de cesión',
    description: 'Permite confirmar o rechazar la recepción de un movimiento de tipo CEDIÓ.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID del movimiento a confirmar.',
  })
  @ApiBody({
    type: ConfirmarMovimientoRequestDto,
    description: 'Datos de confirmación del movimiento.',
  })
  @ApiOkResponse({
    type: MovimientoDTO,
    description: 'Movimiento confirmado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o movimiento no válido para confirmación.',
  })
  @ApiNotFoundResponse({
    description: 'Movimiento no encontrado.',
  })
  async confirmarMovimiento(
    @Param('id', ParseIntPipe) id: number,
    @Body() confirmarMovimientoDto: ConfirmarMovimientoRequestDto
  ): Promise<MovimientoDTO> {
    const movimiento = await this.movimientoBulkService.confirmarMovimiento(id, confirmarMovimientoDto.confirmado);
    return this.movimientoService.entity2DTO(movimiento);
  }

  @Get('pendientes-confirmacion')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Obtener movimientos pendientes de confirmación',
    description: 'Obtiene todos los movimientos de tipo CEDIÓ que están pendientes de confirmación.',
  })
  @ApiOkResponse({
    type: [MovimientoDTO],
    description: 'Lista de movimientos pendientes de confirmación.',
  })
  async getMovimientosPendientesConfirmacion(): Promise<MovimientoDTO[]> {
    const movimientos = await this.movimientoBulkService.obtenerMovimientosPendientesConfirmacion();
    return this.movimientoService.mapEntitiesToDTOs(movimientos);
  }
}
