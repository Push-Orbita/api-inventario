import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { InventarioMapper } from './mappers/inventario.mapper';
import { InventarioRepository } from './repository/inventario-repository';

import { PageDto } from 'src/common/dto/page.dto';
import { InventarioDTO } from './dto/inventario.dto';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';
import { SearchInventarioRequestDto } from './dto/search-inventario-request.dto';


@Injectable()
export class InventarioService {

  constructor(

    private readonly inventarioMapper: InventarioMapper,
    private readonly inventarioRepository: InventarioRepository,

  ) { }

  public async create(request: CreateInventarioRequestDto): Promise<InventarioDTO> {
    try {
      const newInventario = await this.inventarioMapper.createDTO2Entity(request);
      await this.inventarioRepository.save(newInventario);
      const inventarioSaved = await this.inventarioMapper.entity2DTO(newInventario);
      return inventarioSaved;
    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Inventario: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<InventarioDTO> {
    try {

      const inventario = await this.inventarioRepository.findOne({
        where: { id: id }
      });

      if (!inventario) {
        throw new NotFoundException(`No se encontró el inventario con id ${id}`);
      }
      return this.inventarioMapper.entity2DTO(inventario);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar inventario: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateInventarioRequestDto: UpdateInventarioRequestDto): Promise<InventarioDTO> {
    try {
      const inventario = await this.inventarioRepository.findOne({ where: { id: id } });
      if (!inventario) throw new NotFoundException(`No se encontró el inventario con id ${id}`);
      const updateInventario = await this.inventarioMapper.updateDTO2Entity(inventario, updateInventarioRequestDto);
      await this.inventarioRepository.save(updateInventario);
      const inventarioUpdate = await this.inventarioMapper.entity2DTO(updateInventario);
      return inventarioUpdate;
    } catch (error) {
      throw new BadRequestException(`Error al actualizar inventario: ${error.message}`);
    }
  }

  public async remove(id: number) {

    const inventario = await this.inventarioRepository.findOne({ where: { id: id } });
    if (!inventario) throw new NotFoundException(`No se encontró el inventario con id ${id}`);

    try {

      await this.inventarioRepository.softRemove(inventario);
      return `Inventario eliminado`;

    } catch (error) {
      throw new BadRequestException(`Error al eliminar inventario: ${error.message}`);
    }
  }

  public async searchInventario(request: SearchInventarioRequestDto): Promise<PageDto<InventarioDTO>> {
    try {
      const inventarioPage = await this.inventarioRepository.search(request);
      return this.inventarioMapper.page2Dto(request, inventarioPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar inventarios: ${error.message}`);
    }
  }
}
