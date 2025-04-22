import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

import { PageDto } from 'src/common/dto/page.dto';
import { ERRORS } from 'src/common/errors/error-codes';

import { ModeloMapper } from './mappers/modelo.mapper';
import { ModeloRepository } from './repository/modelo-repository';

import { ModeloDTO } from './dto/modelo.dto';
import { CreateModeloRequestDto } from './dto/create-modelo-request.dto';
import { UpdateModeloRequestDto } from './dto/update-modelo-request.dto';
import { SearchModeloRequestDto } from './dto/search-modelo-request.dto';


@Injectable()
export class ModeloService {

  constructor(

    private readonly modeloMapper: ModeloMapper,
    private readonly modeloRepository: ModeloRepository,

  ) { }

  public async create(request: CreateModeloRequestDto): Promise<ModeloDTO> {

    const existsModelo = await this.modeloRepository.findOne({
      where: { nombre: request.nombre }
    });

    if (existsModelo) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Modelo: ${existsModelo.nombre}`,
      });
    }

    try {
      const newModelo = await this.modeloMapper.createDTO2Entity(request);
      await this.modeloRepository.save(newModelo);
      const modeloSaved = await this.modeloMapper.entity2DTO(newModelo);
      return modeloSaved;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async findById(id: number): Promise<ModeloDTO> {
    try {

      const modelo = await this.modeloRepository.findOne({
        where: { id: id }
      });

      if (!modelo) {
        throw new NotFoundException(`No se encontró el modelo con id ${id}`);
      }
      return this.modeloMapper.entity2DTO(modelo);
    } catch (error) {
      throw new BadRequestException(
        `Error al buscar modelo: ${error.message}`,
      );
    }
  }

  public async update(id: number, updateModeloRequestDto: UpdateModeloRequestDto): Promise<ModeloDTO> {

    const modelo = await this.modeloRepository.findOne({ where: { id: id } });

    try {

      const existsModelo = await this.modeloRepository.findOne({
        where: { nombre: updateModeloRequestDto.nombre, id: Not(id) }
      })

      if (existsModelo) {
        throw new BadRequestException({
          code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
          message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
          details: `Modelo: ${existsModelo.nombre}`,
        });
      }

      if (!modelo) throw new NotFoundException(`No se encontró el modelo con id ${id}`);
      const updateModelo = await this.modeloMapper.updateDTO2Entity(modelo, updateModeloRequestDto);
      await this.modeloRepository.save(updateModelo);
      const modeloUpdate = await this.modeloMapper.entity2DTO(updateModelo);
      return modeloUpdate;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async remove(id: number) {

    const modelo = await this.modeloRepository.findOne({ where: { id: id } });
    if (!modelo) throw new NotFoundException(`No se encontró el modelo con id ${id}`);

    try {

      const date = new Date().getTime().toString().slice(-6);
      modelo.nombre += `_(deleted_${date})`;
      await this.modeloRepository.save(modelo);
      await this.modeloRepository.softRemove(modelo);
      return 'Modelo eliminada';

    } catch (error) {
      throw new BadRequestException(`Error al eliminar modelo: ${error.message}`);
    }
  }

  public async searchModelo(request: SearchModeloRequestDto): Promise<PageDto<ModeloDTO>> {
    try {
      const modeloPage = await this.modeloRepository.search(request);
      return this.modeloMapper.page2Dto(request, modeloPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar modelos: ${error.message}`);
    }
  }
}
