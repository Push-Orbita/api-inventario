import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { HistorialUbicacionService } from './services/historial-ubicacion.service';
import { CambiarUbicacionRequestDto } from './dto/cambiar-ubicacion-request.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/common/utils/auth-utils/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { HistorialUbicacion } from './entities/historial-ubicacion.entity';
import { Unidad } from 'src/schematics/unidad/entities/unidad.entity';
import { Ubicacion } from 'src/schematics/ubicacion/entities/ubicacion.entity';

@ApiTags('Historial Ubicación')
@Controller('historial-ubicacion')
export class HistorialUbicacionController {

  constructor(private readonly historialUbicacionService: HistorialUbicacionService) { }

  @Post('cambiar-ubicacion')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Cambiar ubicación de una unidad',
    description: 'Registra un cambio de ubicación de una unidad y mantiene el historial completo.',
  })
  @ApiBody({
    type: CambiarUbicacionRequestDto,
    description: 'Datos para cambiar la ubicación de una unidad.',
  })
  @ApiOkResponse({
    type: HistorialUbicacion,
    description: 'Cambio de ubicación registrado correctamente.',
  })
  @ApiBadRequestResponse({
    description: 'Solicitud incorrecta o datos inválidos.',
  })
  async cambiarUbicacion(
    @Body() cambiarUbicacionDto: CambiarUbicacionRequestDto,
    @GetUserId() userId: number
  ): Promise<HistorialUbicacion> {
    cambiarUbicacionDto.userId = userId;
    return await this.historialUbicacionService.cambiarUbicacion(cambiarUbicacionDto);
  }

  @Get('unidad/:unidadId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Obtener historial de ubicaciones de una unidad',
    description: 'Obtiene el historial completo de cambios de ubicación de una unidad específica.',
  })
  @ApiParam({
    name: 'unidadId',
    required: true,
    description: 'ID de la unidad para obtener su historial de ubicaciones.',
  })
  @ApiOkResponse({
    type: [HistorialUbicacion],
    description: 'Historial de ubicaciones de la unidad.',
  })
  @ApiNotFoundResponse({
    description: 'Unidad no encontrada.',
  })
  async obtenerHistorialUbicacion(
    @Param('unidadId', ParseIntPipe) unidadId: number
  ): Promise<HistorialUbicacion[]> {
    return await this.historialUbicacionService.obtenerHistorialUbicacion(unidadId);
  }

  @Get('unidad/:unidadId/ubicacion-actual')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Obtener ubicación actual de una unidad',
    description: 'Obtiene la ubicación actual de una unidad específica.',
  })
  @ApiParam({
    name: 'unidadId',
    required: true,
    description: 'ID de la unidad para obtener su ubicación actual.',
  })
  @ApiOkResponse({
    type: Ubicacion,
    description: 'Ubicación actual de la unidad.',
  })
  @ApiNotFoundResponse({
    description: 'Unidad no encontrada.',
  })
  async obtenerUbicacionActual(
    @Param('unidadId', ParseIntPipe) unidadId: number
  ): Promise<Ubicacion | null> {
    return await this.historialUbicacionService.obtenerUbicacionActual(unidadId);
  }

  @Get('ubicacion/:ubicacionId/unidades')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Obtener unidades por ubicación',
    description: 'Obtiene todas las unidades que se encuentran en una ubicación específica.',
  })
  @ApiParam({
    name: 'ubicacionId',
    required: true,
    description: 'ID de la ubicación para obtener sus unidades.',
  })
  @ApiOkResponse({
    type: [Unidad],
    description: 'Lista de unidades en la ubicación.',
  })
  @ApiNotFoundResponse({
    description: 'Ubicación no encontrada.',
  })
  async obtenerUnidadesPorUbicacion(
    @Param('ubicacionId', ParseIntPipe) ubicacionId: number
  ): Promise<Unidad[]> {
    return await this.historialUbicacionService.obtenerUnidadesPorUbicacion(ubicacionId);
  }
}
