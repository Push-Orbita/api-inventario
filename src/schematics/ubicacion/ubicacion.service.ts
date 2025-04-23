import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

import { ERRORS } from 'src/common/errors/error-codes';
import { UbicacionMapper } from './mappers/ubicacion.mapper';
import { UbicacionRepository } from './repository/ubicacion.repository';

import { PageDto } from 'src/common/dto/page.dto';
import { UbicacionDTO } from './dto/ubicacion.dto';
import { CreateUbicacionRequestDto } from './dto/create-ubicacion-request.dto';
import { UpdateUbicacionRequestDto } from './dto/update-ubicacion-request.dto';
import { SearchUbicacionRequestDto } from './dto/search-ubicacion-request.dto';


@Injectable()
export class UbicacionService {

  constructor(

    private readonly ubicacionMapper: UbicacionMapper,
    private readonly ubicacionRepository: UbicacionRepository,

  ) { }

  public async create(request: CreateUbicacionRequestDto): Promise<UbicacionDTO> {

    const existingUbicacion = await this.ubicacionRepository.findOne({
      where: { nombre: request.nombre },
    });

    if (existingUbicacion) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Ubicacion: ${existingUbicacion.nombre}`,
      });
    }

    try {
      const newUbicacion = await this.ubicacionMapper.createDTO2Entity(request);
      await this.ubicacionRepository.save(newUbicacion);
      const ubicacionSaved = await this.ubicacionMapper.entity2DTO(newUbicacion);
      return ubicacionSaved;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async findById(id: number): Promise<UbicacionDTO> {
    try {

      const ubicacion = await this.ubicacionRepository.findOne({
        where: { id: id }
      });

      if (!ubicacion) {
        throw new NotFoundException({
          code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
          message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
          details: `ID: ${id}`,
        })
      }
      return this.ubicacionMapper.entity2DTO(ubicacion);
    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }

  public async update(id: number, updateUbicacionRequestDto: UpdateUbicacionRequestDto): Promise<UbicacionDTO> {

    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: id } });
    if (!ubicacion) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    }

    const existingUbicacion = await this.ubicacionRepository.findOne({
      where: { nombre: updateUbicacionRequestDto.nombre, id: Not(id) },
    });

    if (existingUbicacion) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Ubicacion: ${existingUbicacion.nombre}`,
      });
    }

    try {

      const updateUbicacion = await this.ubicacionMapper.updateDTO2Entity(ubicacion, updateUbicacionRequestDto);
      await this.ubicacionRepository.save(updateUbicacion);
      const ubicacionUpdate = await this.ubicacionMapper.entity2DTO(updateUbicacion);
      return ubicacionUpdate;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async remove(id: number) {

    const ubicacion = await this.ubicacionRepository.findOne({ where: { id: id } });
    if (!ubicacion) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    }

    try {

      const date = new Date().getTime().toString().slice(-6);

      ubicacion.nombre += `_(deleted_${date})`;
      ubicacion.direccion += `_(deleted_${date})`;

      await this.ubicacionRepository.save(ubicacion);
      await this.ubicacionRepository.softRemove(ubicacion);
      return 'Ubicacion eliminada';

    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }

  public async searchUbicacion(request: SearchUbicacionRequestDto): Promise<PageDto<UbicacionDTO>> {
    try {
      const ubicacionPage = await this.ubicacionRepository.search(request);
      return this.ubicacionMapper.page2Dto(request, ubicacionPage);
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }
}
