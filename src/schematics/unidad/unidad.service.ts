import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UnidadMapper } from './mappers/unidad.mapper';
import { UnidadRepository } from './repository/unidad-repository';

import { PageDto } from 'src/common/dto/page.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from './dto/update-unidad-request.dto';
import { SearchUnidadRequestDto } from './dto/search-unidad-request.dto';


@Injectable()
export class UnidadService {

  constructor(

    private readonly unidadMapper: UnidadMapper,
    private readonly unidadRepository: UnidadRepository,

  ) { }

  public async create(request: CreateUnidadRequestDto): Promise<UnidadDTO> {
    try {
      const newUnidad = await this.unidadMapper.createDTO2Entity(request);
      await this.unidadRepository.save(newUnidad);
      const unidadSaved = await this.unidadMapper.entity2DTO(newUnidad);
      return unidadSaved;
    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Unidad: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<UnidadDTO> {
    try {

      const unidad = await this.unidadRepository.findOne({
        where: { id: id },
        relations: ['inventario'],
      });

      if (!unidad) {
        throw new NotFoundException(`No se encontró el unidad con id ${id}`);
      }
      return this.unidadMapper.entity2DTO(unidad);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar unidad: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateUnidadRequestDto: UpdateUnidadRequestDto): Promise<UnidadDTO> {
    try {
      const unidad = await this.unidadRepository.findOne({ where: { id: id } });
      if (!unidad) throw new NotFoundException(`No se encontró el unidad con id ${id}`);
      const updateUnidad = await this.unidadMapper.updateDTO2Entity(unidad, updateUnidadRequestDto);
      await this.unidadRepository.save(updateUnidad);
      const unidadUpdate = await this.unidadMapper.entity2DTO(updateUnidad);
      return unidadUpdate;
    } catch (error) {
      throw new BadRequestException(`Error al actualizar unidad: ${error.message}`);
    }
  }

  public async remove(id: number) {

    const unidad = await this.unidadRepository.findOne({ where: { id: id } });
    if (!unidad) throw new NotFoundException(`No se encontró el unidad con id ${id}`);

    try {

      await this.unidadRepository.softRemove(unidad);
      return `Unidad eliminado`;

    } catch (error) {
      throw new BadRequestException(`Error al eliminar unidad: ${error.message}`);
    }
  }

  public async searchUnidad(request: SearchUnidadRequestDto): Promise<PageDto<UnidadDTO>> {
    try {
      console.log(request);
      const unidadPage = await this.unidadRepository.search(request);
      return this.unidadMapper.page2Dto(request, unidadPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar unidads: ${error.message}`);
    }
  }
}
