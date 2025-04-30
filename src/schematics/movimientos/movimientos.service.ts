import { Injectable } from '@nestjs/common';
import { CreateMovimientoRequestDto } from './dto/create-movimiento-request.dto';
import { UpdateMovimientoRequestDto } from './dto/update-movimiento-request.dto';

@Injectable()
export class MovimientosService {
  create(createMovimientoDto: CreateMovimientoRequestDto) {
    return 'This action adds a new movimiento';
  }

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
