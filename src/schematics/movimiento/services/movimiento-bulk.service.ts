import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Movimiento } from "../entities/movimiento.entity";
import { CreateBulkMovimientosRequestDto } from "../dto/create-bulk-movimientos-request.dto";
import { MovimientoMapper } from "../mappers/movimiento.mapper";
import { Unidad } from "src/schematics/unidad/entities/unidad.entity";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";

@Injectable()
export class MovimientoBulkService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
    @InjectRepository(Unidad)
    private readonly unidadRepository: Repository<Unidad>,
    private readonly movimientoMapper: MovimientoMapper,
  ) {}

  async crearMovimientosEnLote(request: CreateBulkMovimientosRequestDto): Promise<Movimiento[]> {
    const movimientos: Movimiento[] = [];

    // Validar que todas las unidades existen
    const unidades = await this.unidadRepository.findBy({ id: In(request.unidades) });
    if (unidades.length !== request.unidades.length) {
      throw new Error('Una o más unidades no existen');
    }

    // Crear un movimiento por cada unidad
    for (const unidadId of request.unidades) {
      const movimiento = new Movimiento();
      movimiento.user = request.userId;
      movimiento.persona = request.persona;
      movimiento.fecha = request.fecha;
      movimiento.operacion = request.operacion;
      movimiento.detalle = request.detalle;
      movimiento.confirmado = request.confirmado || null;
      movimiento.unidad = Unidad.fromId(unidadId);

      // Validaciones específicas por tipo de operación
      await this.validarOperacion(movimiento, request.operacion);

      movimientos.push(movimiento);
    }

    // Guardar todos los movimientos en una transacción
    return await this.movimientoRepository.save(movimientos);
  }

  private async validarOperacion(movimiento: Movimiento, operacion: TipoOperacionEnum): Promise<void> {
    switch (operacion) {
      case TipoOperacionEnum.CEDIÓ:
        // Para cesión, por defecto no está confirmado
        if (movimiento.confirmado === undefined || movimiento.confirmado === null) {
          movimiento.confirmado = null;
        }
        break;
      
      case TipoOperacionEnum.RECIBIÓ:
        // Para recepción, debe estar confirmado
        movimiento.confirmado = true;
        break;
      
      case TipoOperacionEnum.ADQUIERE:
      case TipoOperacionEnum.DEVUELVE:
        // Para adquisición y devolución, no requiere confirmación
        movimiento.confirmado = null;
        break;
      
      default:
        throw new Error(`Tipo de operación no válido: ${operacion}`);
    }
  }

  async confirmarMovimiento(movimientoId: number, confirmado: boolean): Promise<Movimiento> {
    const movimiento = await this.movimientoRepository.findOne({
      where: { id: movimientoId },
      relations: ['unidad']
    });

    if (!movimiento) {
      throw new Error('Movimiento no encontrado');
    }

    if (movimiento.operacion !== TipoOperacionEnum.CEDIÓ) {
      throw new Error('Solo se pueden confirmar movimientos de tipo CEDIÓ');
    }

    movimiento.confirmado = confirmado;
    return await this.movimientoRepository.save(movimiento);
  }

  async obtenerMovimientosPendientesConfirmacion(): Promise<Movimiento[]> {
    return await this.movimientoRepository.find({
      where: {
        operacion: TipoOperacionEnum.CEDIÓ,
        confirmado: null
      } as any,
      relations: ['unidad']
    });
  }
}
