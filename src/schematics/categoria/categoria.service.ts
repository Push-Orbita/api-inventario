import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Not } from 'typeorm';

import { ERRORS } from 'src/common/errors/error-codes';
import { CategoriaMapper } from './mappers/categoria.mapper';
import { CategoriaRepository } from './repository/categoria.repository';

import { PageDto } from 'src/common/dto/page.dto';
import { CategoriaDTO } from './dto/categoria.dto';
import { CreateCategoriaRequestDto } from './dto/create-categoria-request.dto';
import { UpdateCategoriaRequestDto } from './dto/update-categoria-request.dto';
import { SearchCategoriaRequestDto } from './dto/search-categoria-request.dto';


@Injectable()
export class CategoriaService {

  constructor(

    private readonly categoriaMapper: CategoriaMapper,
    private readonly categoriaRepository: CategoriaRepository,

  ) { }

  public async create(request: CreateCategoriaRequestDto): Promise<CategoriaDTO> {

    const existingCategoria = await this.categoriaRepository.findOne({
      where: { nombre: request.nombre },
    });

    if (existingCategoria) {
      throw new BadRequestException({
        code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
        message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
        details: `Categoria: ${existingCategoria.nombre}`,
      });
    }

    try {
      const newCategoria = await this.categoriaMapper.createDTO2Entity(request);
      await this.categoriaRepository.save(newCategoria);
      const categoriaSaved = await this.categoriaMapper.entity2DTO(newCategoria);
      return categoriaSaved;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async findById(id: number): Promise<CategoriaDTO> {
    try {

      const categoria = await this.categoriaRepository.findOne({
        where: { id: id }
      });

      if (!categoria) {
        throw new NotFoundException({
          code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
          message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
          details: `ID: ${id}`,
        });
      }
      return this.categoriaMapper.entity2DTO(categoria);
    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }

  public async update(id: number, updateCategoriaRequestDto: UpdateCategoriaRequestDto): Promise<CategoriaDTO> {

    const categoria = await this.categoriaRepository.findOne({ where: { id: id } });

    if (!categoria) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    }

    try {
      const existingCategoria = await this.categoriaRepository.findOne({
        where: { nombre: updateCategoriaRequestDto.nombre, id: Not(id) },
      });

      if (existingCategoria) {
        throw new BadRequestException({
          code: ERRORS.ENTITY.NAME_ALREADY_EXISTS.CODE,
          message: ERRORS.ENTITY.NAME_ALREADY_EXISTS.MESSAGE,
          details: `Categoria: ${existingCategoria.nombre}`,
        });
      }

      const updateCategoria = await this.categoriaMapper.updateDTO2Entity(categoria, updateCategoriaRequestDto);

      await this.categoriaRepository.save(updateCategoria);

      const categoriaUpdate = await this.categoriaMapper.entity2DTO(updateCategoria);
      return categoriaUpdate;
    } catch (error) {
      throw new BadRequestException({
        code: ERRORS.VALIDATION.INVALID_INPUT.CODE,
        message: ERRORS.VALIDATION.INVALID_INPUT.MESSAGE,
        details: `Detalles: ${error.message}`,
      });
    }
  }

  public async remove(id: number) {

    const categoria = await this.categoriaRepository.findOne({
      where: { id: id }
    });

    if (!categoria) {
      throw new NotFoundException({
        code: ERRORS.DATABASE.RECORD_NOT_FOUND.CODE,
        message: ERRORS.DATABASE.RECORD_NOT_FOUND.MESSAGE,
        details: `ID: ${id}`,
      });
    }

    try {

      const date = new Date().getTime().toString().slice(-6);

      categoria.nombre += `_(deleted_${date})`;
      categoria.descripcion += `_(deleted_${date})`;

      await this.categoriaRepository.save(categoria);
      await this.categoriaRepository.softRemove(categoria);
      return 'Categoria eliminada';

    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }

  public async searchCategoria(request: SearchCategoriaRequestDto): Promise<PageDto<CategoriaDTO>> {
    try {
      const categoriaPage = await this.categoriaRepository.search(request);
      return this.categoriaMapper.page2Dto(request, categoriaPage);
    } catch (error) {
      throw new InternalServerErrorException({
        code: ERRORS.DATABASE.QUERY_FAILED.CODE,
        message: ERRORS.DATABASE.QUERY_FAILED.MESSAGE,
        details: error.message,
      });
    }
  }
}
