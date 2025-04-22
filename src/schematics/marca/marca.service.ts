import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

import { ERRORS } from 'src/common/errors/error-codes';
import { MarcaMapper } from './mappers/marca.mapper';
import { MarcaRepository } from './repository/marca.repository';

import { PageDto } from 'src/common/dto/page.dto';
import { MarcaDTO } from './dto/marca.dto';
import { CreateMarcaRequestDto } from './dto/create-marca-request.dto';
import { UpdateMarcaRequestDto } from './dto/update-marca-request.dto';
import { SearchMarcaRequestDto } from './dto/search-marca-request.dto';


@Injectable()
export class MarcaService {

  constructor(

    private readonly marcaMapper: MarcaMapper,
    private readonly marcaRepository: MarcaRepository,

  ) { }

  public async create(request: CreateMarcaRequestDto): Promise<MarcaDTO> {

    const existingMarca = await this.marcaRepository.findOne({
      where: { nombre: request.nombre },
    });

    if (existingMarca) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Marca: ${existingMarca.nombre}`,
      });
    }


    try {
      const newMarca = await this.marcaMapper.createDTO2Entity(request);
      await this.marcaRepository.save(newMarca);
      const marcaSaved = await this.marcaMapper.entity2DTO(newMarca);
      return marcaSaved;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async findById(id: number): Promise<MarcaDTO> {
    try {

      const marca = await this.marcaRepository.findOne({
        where: { id: id }
      });

      if (!marca) {
        throw new NotFoundException(`No se encontró la marca con id ${id}`);
      }
      return this.marcaMapper.entity2DTO(marca);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar marca: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateMarcaRequestDto: UpdateMarcaRequestDto): Promise<MarcaDTO> {

    const marca = await this.marcaRepository.findOne({ where: { id: id } });
    if (!marca) throw new NotFoundException(`No se encontró la marca con id ${id}`);

    try {
      const existingMarca = await this.marcaRepository.findOne({
        where: { nombre: updateMarcaRequestDto.nombre, id: Not(id) },
      });

      if (existingMarca) {
        throw new BadRequestException({
          code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
          message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
          details: `Marca: ${existingMarca.nombre}`,
        });
      }

      const updateMarca = await this.marcaMapper.updateDTO2Entity(marca, updateMarcaRequestDto);
      await this.marcaRepository.save(updateMarca);
      const marcaUpdate = await this.marcaMapper.entity2DTO(updateMarca);
      return marcaUpdate;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async remove(id: number) {

    const marca = await this.marcaRepository.findOne({ where: { id: id } });
    if (!marca) throw new NotFoundException(`No se encontró la marca con id ${id}`);

    try {

      const date = new Date().getTime().toString().slice(-6);
      marca.nombre += `_(deleted_${date})`;
      await this.marcaRepository.save(marca);
      await this.marcaRepository.softRemove(marca);
      return 'Marca eliminada';

    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async searchMarca(request: SearchMarcaRequestDto): Promise<PageDto<MarcaDTO>> {
    try {
      const marcaPage = await this.marcaRepository.search(request);
      return this.marcaMapper.page2Dto(request, marcaPage);
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }
}
