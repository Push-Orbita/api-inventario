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
      where: { id: request.unidadId }
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

    // Obtener la ubicación actual de la unidad (último registro del historial)
    const ubicacionActual = await this.obtenerUbicacionActual(request.unidadId);

    // Verificar si la unidad ya está en la ubicación destino
    if (ubicacionActual && ubicacionActual.id === request.nuevaUbicacionId) {
      throw new Error('La unidad ya se encuentra en esa ubicación');
    }

    // Crear registro de historial
    const historial = new HistorialUbicacion();
    historial.user = request.userId;
    historial.fechaCambio = request.fechaCambio;
    historial.motivo = request.motivo || 'Cambio de ubicación';
    historial.ubicacionAnterior = ubicacionActual;
    historial.ubicacionNueva = nuevaUbicacion;
    historial.unidad = unidad;

    // Guardar el historial
    const historialGuardado = await this.historialRepository.save(historial);

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
    const ultimoHistorial = await this.historialRepository.findOne({
      where: { unidad: { id: unidadId } },
      relations: ['ubicacionNueva'],
      order: { fechaCambio: 'DESC' }
    });

    return ultimoHistorial?.ubicacionNueva || null;
  }

  async obtenerUnidadesPorUbicacion(ubicacionId: number): Promise<Unidad[]> {
    // Obtener todas las unidades que tienen como ubicación actual la especificada
    const historialesActuales = await this.historialRepository.find({
      where: { ubicacionNueva: { id: ubicacionId } },
      relations: ['unidad', 'unidad.producto']
    });

    // Obtener solo las unidades que tienen la ubicación más reciente
    const unidadesConUbicacionActual = new Map<number, Unidad>();
    
    for (const historial of historialesActuales) {
      const unidadId = historial.unidad.id;
      
      // Verificar si esta es la ubicación más reciente para esta unidad
      const ultimoHistorial = await this.historialRepository.findOne({
        where: { unidad: { id: unidadId } },
        order: { fechaCambio: 'DESC' }
      });

      if (ultimoHistorial && ultimoHistorial.ubicacionNueva.id === ubicacionId) {
        unidadesConUbicacionActual.set(unidadId, historial.unidad);
      }
    }

    return Array.from(unidadesConUbicacionActual.values());
  }

  async obtenerUnidadesConUbicacionActual(): Promise<{ unidad: Unidad; ubicacionActual: Ubicacion | null }[]> {
    // Obtener todas las unidades
    const unidades = await this.unidadRepository.find({
      relations: ['producto']
    });

    // Para cada unidad, obtener su ubicación actual
    const unidadesConUbicacion = await Promise.all(
      unidades.map(async (unidad) => {
        const ubicacionActual = await this.obtenerUbicacionActual(unidad.id);
        return { unidad, ubicacionActual };
      })
    );

    return unidadesConUbicacion;
  }

  async asignarUbicacionInicial(unidadId: number, ubicacionId: number, userId: number, motivo?: string): Promise<HistorialUbicacion> {
    // Validar que la unidad existe
    const unidad = await this.unidadRepository.findOne({
      where: { id: unidadId }
    });

    if (!unidad) {
      throw new Error('Unidad no encontrada');
    }

    // Validar que la ubicación existe
    const ubicacion = await this.ubicacionRepository.findOne({
      where: { id: ubicacionId }
    });

    if (!ubicacion) {
      throw new Error('Ubicación no encontrada');
    }

    // Verificar que la unidad no tenga historial previo
    const historialExistente = await this.historialRepository.findOne({
      where: { unidad: { id: unidadId } }
    });

    if (historialExistente) {
      throw new Error('La unidad ya tiene un historial de ubicaciones');
    }

    // Crear registro de historial inicial
    const historial = new HistorialUbicacion();
    historial.user = userId;
    historial.fechaCambio = new Date();
    historial.motivo = motivo || 'Asignación inicial de ubicación';
    historial.ubicacionAnterior = null;
    historial.ubicacionNueva = ubicacion;
    historial.unidad = unidad;

    return await this.historialRepository.save(historial);
  }
}
