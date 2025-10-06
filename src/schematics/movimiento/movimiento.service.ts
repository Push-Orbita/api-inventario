import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';
import { MovimientoMapper } from './mappers/movimiento.mapper';
import { MovimientoDTO } from './dto/movimiento.dto';
import { MovimientoRepository } from './repository/movimiento.repository';
import { SearchMovimientoRequestDto } from './dto/search-movimiento-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { UnidadRepository } from '../unidad/repository/unidad-repository';
import { TipoEstadoEnum } from 'src/common/enums/tipo-estado.enum';
import { HistorialUbicacionService } from '../historial-ubicacion/services/historial-ubicacion.service';

@Injectable()
export class MovimientoService {

  constructor(
    private readonly movimientoMapper: MovimientoMapper,
    private readonly movimientoRepository: MovimientoRepository,
    private readonly unidadRepository: UnidadRepository,
    private readonly historialUbicacionService: HistorialUbicacionService
  ) { }

  public async create(request: CreateMovimientoRequestDto): Promise<MovimientoDTO> {
    try {
      const newMovimiento = await this.movimientoMapper.createDTO2Entity(request);

      const unidad = await this.unidadRepository.findOne({ where: { id: request.unidad } });
      if (!unidad) {
        throw new NotFoundException(`No se encontró la unidad con id ${request.unidad}`);
      }

      // Validar que se proporcione ubicación destino para operaciones que la requieren
      if ((request.operacion === "ADQUIERE" || request.operacion === "DEVUELVE") && !request.ubicacionDestino) {
        throw new BadRequestException(`La operación ${request.operacion} requiere especificar una ubicación destino.`);
      }

      // Obtener ubicación actual de la unidad
      const ubicacionActual = await this.historialUbicacionService.obtenerUbicacionActual(request.unidad);

      if (request.operacion === "ADQUIERE") {
        if (unidad.estado !== TipoEstadoEnum.DISPONIBLE) {
          throw new BadRequestException(`La unidad no está disponible para ser adquirida.`);
        }
        unidad.estado = TipoEstadoEnum.EN_USO;
        
        // Registrar cambio de ubicación en el historial
        await this.historialUbicacionService.cambiarUbicacion({
          unidadId: request.unidad,
          nuevaUbicacionId: request.ubicacionDestino!,
          userId: request.userId,
          fechaCambio: request.fecha,
          motivo: `Adquisición: ${request.detalle}`
        });
      }

      if (request.operacion === "DEVUELVE") {
        if (unidad.estado !== TipoEstadoEnum.EN_USO) {
          throw new BadRequestException(`La unidad no se encuentra en uso para ser devuelta.`);
        }
        unidad.estado = TipoEstadoEnum.DISPONIBLE;
        
        // Registrar cambio de ubicación en el historial
        await this.historialUbicacionService.cambiarUbicacion({
          unidadId: request.unidad,
          nuevaUbicacionId: request.ubicacionDestino!,
          userId: request.userId,
          fechaCambio: request.fecha,
          motivo: `Devolución: ${request.detalle}`
        });
      }

      if (request.operacion === "CEDIÓ" || request.operacion === "RECIBIÓ") {
        if (request.ubicacionDestino) {
          // Registrar cambio de ubicación en el historial
          await this.historialUbicacionService.cambiarUbicacion({
            unidadId: request.unidad,
            nuevaUbicacionId: request.ubicacionDestino,
            userId: request.userId,
            fechaCambio: request.fecha,
            motivo: `${request.operacion}: ${request.detalle}`
          });
        }
      }

      await this.unidadRepository.save(unidad);

      newMovimiento.unidad = unidad;

      await this.movimientoRepository.save(newMovimiento);

      const movimientoSaved = await this.movimientoMapper.entity2DTO(newMovimiento);
      return movimientoSaved;

    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Movimiento: ${error.message}`);
    }
  }

  /**
   * Método especial para crear un movimiento de adquisición con asignación inicial de ubicación
   * Útil cuando una unidad nueva se adquiere por primera vez
   */
  public async createConAsignacionInicial(request: CreateMovimientoRequestDto): Promise<MovimientoDTO> {
    try {
      const newMovimiento = await this.movimientoMapper.createDTO2Entity(request);

      const unidad = await this.unidadRepository.findOne({ where: { id: request.unidad } });
      if (!unidad) {
        throw new NotFoundException(`No se encontró la unidad con id ${request.unidad}`);
      }

      // Validar que se proporcione ubicación destino
      if (!request.ubicacionDestino) {
        throw new BadRequestException(`La asignación inicial requiere especificar una ubicación destino.`);
      }

      // Verificar si la unidad ya tiene historial de ubicaciones
      const historialExistente = await this.historialUbicacionService.obtenerHistorialUbicacion(request.unidad);
      
      if (request.operacion === "ADQUIERE") {
        if (unidad.estado !== TipoEstadoEnum.DISPONIBLE) {
          throw new BadRequestException(`La unidad no está disponible para ser adquirida.`);
        }
        unidad.estado = TipoEstadoEnum.EN_USO;

        if (historialExistente.length === 0) {
          // Primera asignación de ubicación
          await this.historialUbicacionService.asignarUbicacionInicial(
            request.unidad,
            request.ubicacionDestino,
            request.userId,
            `Adquisición inicial: ${request.detalle}`
          );
        } else {
          // Cambio de ubicación normal
          await this.historialUbicacionService.cambiarUbicacion({
            unidadId: request.unidad,
            nuevaUbicacionId: request.ubicacionDestino,
            userId: request.userId,
            fechaCambio: request.fecha,
            motivo: `Adquisición: ${request.detalle}`
          });
        }
      }

      await this.unidadRepository.save(unidad);
      newMovimiento.unidad = unidad;
      await this.movimientoRepository.save(newMovimiento);

      const movimientoSaved = await this.movimientoMapper.entity2DTO(newMovimiento);
      return movimientoSaved;

    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Movimiento con asignación inicial: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<MovimientoDTO> {
    try {

      const movimiento = await this.movimientoRepository.findOne({
        where: { id: id }
      });

      if (!movimiento) {
        throw new NotFoundException(`No se encontró el movimiento con id ${id}`);
      }
      return this.movimientoMapper.entity2DTO(movimiento);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar movimiento: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateDto: UpdateMovimientoRequestDto): Promise<MovimientoDTO> {
    try {
      const movimiento = await this.movimientoRepository.findOne({
        where: { id },
        relations: ['unidad'],
      });

      if (!movimiento) throw new NotFoundException(`No se encontró el movimiento con id ${id}`);

      const operacionAnterior = movimiento.operacion;
      const unidadAnteriorId = movimiento.unidad.id;

      const updatedMovimiento = await this.movimientoMapper.updateDTO2Entity(movimiento, updateDto);

      const unidadCambio = updateDto.unidad && updateDto.unidad !== unidadAnteriorId;
      const operacionCambio = updateDto.operacion && updateDto.operacion !== operacionAnterior;

      if (unidadCambio || operacionCambio) {
        const unidadAnterior = await this.unidadRepository.findOne({ where: { id: unidadAnteriorId } });
        if (!unidadAnterior) throw new NotFoundException(`No se encontró la unidad con id ${unidadAnteriorId}`);

        if (operacionAnterior === 'ADQUIERE') {
          unidadAnterior.estado = TipoEstadoEnum.DISPONIBLE;
        }
        if (operacionAnterior === 'DEVUELVE') {
          unidadAnterior.estado = TipoEstadoEnum.EN_USO;
        }
        await this.unidadRepository.save(unidadAnterior);

        const nuevaUnidadId = updateDto.unidad ?? unidadAnteriorId;
        const unidadActualizada = await this.unidadRepository.findOne({ where: { id: nuevaUnidadId } });
        if (!unidadActualizada) throw new NotFoundException(`No se encontró la unidad con id ${nuevaUnidadId}`);

        const nuevaOperacion = updateDto.operacion ?? operacionAnterior;
        if (nuevaOperacion === 'ADQUIERE') {
          unidadActualizada.estado = TipoEstadoEnum.EN_USO;
        }
        if (nuevaOperacion === 'DEVUELVE') {
          unidadActualizada.estado = TipoEstadoEnum.DISPONIBLE;
        }
        await this.unidadRepository.save(unidadActualizada);

        updatedMovimiento.unidad = unidadActualizada;
      }

      await this.movimientoRepository.save(updatedMovimiento);
      const movimientoUpdate = await this.movimientoMapper.entity2DTO(updatedMovimiento);
      return movimientoUpdate;

    } catch (error) {
      throw new BadRequestException(`Error al intentar actualizar Movimiento: ${error.message}`);
    }
  }

  public async remove(id: number) {

    const movimiento = await this.movimientoRepository.findOne({ where: { id: id } });
    if (!movimiento) throw new NotFoundException(`No se encontró el movimiento con id ${id}`);

    try {

      await this.movimientoRepository.softRemove(movimiento);
      return { message: `Movimiento con id ${id} eliminado correctamente` };

    } catch (error) {
      throw new BadRequestException(`Error al eliminar movimiento: ${error.message}`);
    }
  }

  public async searchMovimiento(request: SearchMovimientoRequestDto): Promise<PageDto<MovimientoDTO>> {
    try {
      const movimientoPage = await this.movimientoRepository.search(request);
      return this.movimientoMapper.page2Dto(request, movimientoPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar movimientos: ${error.message}`);
    }
  }

  public async entity2DTO(movimiento: any): Promise<MovimientoDTO> {
    return await this.movimientoMapper.entity2DTO(movimiento);
  }

  public async mapEntitiesToDTOs(movimientos: any[]): Promise<MovimientoDTO[]> {
    return await Promise.all(
      movimientos.map(movimiento => this.movimientoMapper.entity2DTO(movimiento))
    );
  }
}
