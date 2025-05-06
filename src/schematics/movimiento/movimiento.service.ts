import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';
import { MovimientoMapper } from './mappers/movimiento.mapper';
import { MovimientoDTO } from './dto/movimiento.dto';
import { MovimientoRepository } from './repository/movimiento.repository';

@Injectable()
export class MovimientoService {

  constructor(
    private readonly movimientoMapper: MovimientoMapper,
    private readonly movimientoRepository: MovimientoRepository,

  ) {}

  public async create(request: CreateMovimientoRequestDto): Promise<MovimientoDTO> {

    try {
      const newMovimiento = await this.movimientoMapper.createDTO2Entity(request);
      await this.movimientoRepository.save(newMovimiento);
      const movimientoSaved = await this.movimientoMapper.entity2DTO(newMovimiento);
      return movimientoSaved;

    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Movimiento: ${error.message}`);
    }
  }


  /*
  create(createMovimientoDto: CreateMovimientoRequestDto) {
    return 'This action adds a new movimiento';
  }
    */

  findAll() {
    return `This action returns all movimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoRequestDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
