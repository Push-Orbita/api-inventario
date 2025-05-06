import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  public async update(id: number, updateMovimientoRequestDto: UpdateMovimientoRequestDto): Promise<MovimientoDTO> {
    try {
      const movimiento = await this.movimientoRepository.findOne({ where: { id: id } });
      if (!movimiento) throw new NotFoundException(`No se encontró el movimiento con id ${id}`);
      const updateMovimiento = await this.movimientoMapper.updateDTO2Entity(movimiento, updateMovimientoRequestDto);
      await this.movimientoRepository.save(updateMovimiento);
      const movimientoUpdate = await this.movimientoMapper.entity2DTO(updateMovimiento);
      return movimientoUpdate;
    } catch (error) {
      throw new BadRequestException(`Error al intentar actualizar Movimiento: ${error.message}`);
    }
  }

  

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
