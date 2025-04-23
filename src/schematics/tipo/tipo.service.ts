import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';
import { ERRORS } from 'src/common/errors/error-codes';

import { TipoMapper } from './mappers/tipo.mapper';
import { TipoRepository } from './repository/tipo-repository';

import { PageDto } from 'src/common/dto/page.dto';
import { TipoDTO } from './dto/tipo.dto';
import { CreateTipoRequestDto } from './dto/create-tipo-request.dto';
import { UpdateTipoRequestDto } from './dto/update-tipo-request.dto';
import { SearchTipoRequestDto } from './dto/search-tipo-request.dto';


@Injectable()
export class TipoService {

  constructor(

    private readonly tipoMapper: TipoMapper,
    private readonly tipoRepository: TipoRepository,

  ) { }

  public async create(request: CreateTipoRequestDto): Promise<TipoDTO> {

    const existsTipo = await this.tipoRepository.findOne({
      where: { nombre: request.nombre }
    });

    if (existsTipo) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Tipo: ${existsTipo.nombre}`,
      });
    }

    try {
      const newTipo = await this.tipoMapper.createDTO2Entity(request);
      await this.tipoRepository.save(newTipo);
      const tipoSaved = await this.tipoMapper.entity2DTO(newTipo);
      return tipoSaved;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async findById(id: number): Promise<TipoDTO> {
    try {

      const tipo = await this.tipoRepository.findOne({
        where: { id: id }
      });

      if (!tipo) {
        throw new NotFoundException({
          code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
          message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
          details: `ID: ${id}`,
        });
      }
      return this.tipoMapper.entity2DTO(tipo);
    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      })
    }
  }

  public async update(id: number, updateTipoRequestDto: UpdateTipoRequestDto): Promise<TipoDTO> {

    const tipo = await this.tipoRepository.findOne({ where: { id: id } });
    if (!tipo) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    };

    try {

      const existsTipo = await this.tipoRepository.findOne({
        where: { nombre: updateTipoRequestDto.nombre, id: Not(id) }
      })

      if (existsTipo) {
        throw new BadRequestException({
          code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
          message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
          details: `Tipo: ${existsTipo.nombre}`,
        });
      }

      const updateTipo = await this.tipoMapper.updateDTO2Entity(tipo, updateTipoRequestDto);
      await this.tipoRepository.save(updateTipo);
      const tipoUpdate = await this.tipoMapper.entity2DTO(updateTipo);
      return tipoUpdate;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async remove(id: number) {

    const tipo = await this.tipoRepository.findOne({ where: { id: id } });

    if (!tipo) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    }

    try {

      const date = new Date().getTime().toString().slice(-6);

      tipo.nombre += `_(deleted_${date})`;
      tipo.descripcion += `_(deleted_${date})`;

      await this.tipoRepository.save(tipo);
      await this.tipoRepository.softRemove(tipo);
      return 'Tipo eliminado';

    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }

  public async searchTipo(request: SearchTipoRequestDto): Promise<PageDto<TipoDTO>> {
    try {
      const tipoPage = await this.tipoRepository.search(request);
      return this.tipoMapper.page2Dto(request, tipoPage);
    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }
}
