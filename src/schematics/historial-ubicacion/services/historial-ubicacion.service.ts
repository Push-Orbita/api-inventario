import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistorialUbicacion } from "../entities/historial-ubicacion.entity";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { Ubicacion } from "src/schematics/ubicacion/entities/ubicacion.entity";
import { CambiarUbicacionRequestDto } from "../dto/cambiar-ubicacion-request.dto";

@Injectable()
export class HistorialUbicacionService {
  constructor(
    @InjectRepository(HistorialUbicacion)
    private readonly historialRepository: Repository<HistorialUbicacion>,
    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
    @InjectRepository(Ubicacion)
    private readonly ubicacionRepository: Repository<Ubicacion>,
  ) {}

  async cambiarUbicacion(request: CambiarUbicacionRequestDto): Promise<HistorialUbicacion> {
    // Validar que la unidad existe
    const unidad = await this.unidadRepository.findOne({
      where: { id: request.unidadId },
      relations: ['ubicacion']
    });

    if (!unidad) {
      throw new Error('Unidad no encontrada');
    }

    // Validar que la nueva ubicación existe
    const nuevaUbicacion = await this.ubicacionRepository.findOne({
      where: { id: request.nuevaUbicacionId }
    });

    if (!nuevaUbicacion) {
      throw new Error('Nueva ubicación no encontrada');
    }

    // Verificar si la unidad ya está en la ubicación destino
    if (unidad.ubicacion && unidad.ubicacion.id === request.nuevaUbicacionId) {
      throw new Error('La unidad ya se encuentra en esa ubicación');
    }

    // Crear registro de historial
    const historial = new HistorialUbicacion();
    historial.user = request.userId;
    historial.fechaCambio = request.fechaCambio;
    historial.motivo = request.motivo || 'Cambio de ubicación';
    historial.ubicacionAnterior = unidad.ubicacion || null;
    historial.ubicacionNueva = nuevaUbicacion;
    historial.unidad = unidad;

    // Guardar el historial
    const historialGuardado = await this.historialRepository.save(historial);

    // Actualizar la ubicación actual de la unidad
    unidad.ubicacion = nuevaUbicacion;
    await this.unidadRepository.save(unidad);

    return historialGuardado;
  }

  async obtenerHistorialUbicacion(unidadId: number): Promise<HistorialUbicacion[]> {
    return await this.historialRepository.find({
      where: { unidad: { id: unidadId } },
      relations: ['ubicacionAnterior', 'ubicacionNueva'],
      order: { fechaCambio: 'DESC' }
    });
  }

  async obtenerUbicacionActual(unidadId: number): Promise<Ubicacion | null> {
    const unidad = await this.unidadRepository.findOne({
      where: { id: unidadId },
      relations: ['ubicacion']
    });

    return unidad?.ubicacion || null;
  }

  async obtenerUnidadesPorUbicacion(ubicacionId: number): Promise<Unidad[]> {
    return await this.unidadRepository.find({
      where: { ubicacion: { id: ubicacionId } },
      relations: ['producto']
    });
  }
}
