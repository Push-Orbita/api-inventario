import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnidadRequestDto } from './dto/create-unidad-request.dto';
import { UpdateUnidadRequestDto } from './dto/update-unidad-request.dto';
import { UnidadDTO } from './dto/unidad.dto';
import { UnidadMapper } from './mappers/unidad.mapper';
import { UnidadRepository } from './repository/unidad-repository';
import { SearchUnidadRequestDto } from './dto/search-unidad-request.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ProductoRepository } from '../producto/repository/producto-repository';

@Injectable()
export class UnidadService {

  constructor(
    private readonly unidadMapper: UnidadMapper,
    private readonly unidadRepository: UnidadRepository,
    private readonly productoRepository: ProductoRepository
  ) { }

  public async create(request: CreateUnidadRequestDto): Promise<UnidadDTO> {
    try {
      const newUnidad = await this.unidadMapper.createDTO2Entity(request);
      const savedUnidad = await this.unidadRepository.save(newUnidad);

      const producto = await this.productoRepository.findOne({
        where: { id: request.producto },
        relations: ['tipo', 'categoria'],
      });

      if (!producto) {
        throw new NotFoundException('Producto no encontrado');
      }

      // Obtener primeras 3 letras o menos, según el caso
      const categoriaNombre = producto.categoria?.nombre
        ? producto.categoria.nombre.substring(0, 3).toLowerCase()
        : 'cat';

      const tipoNombre = producto.tipo?.nombre
        ? producto.tipo.nombre.substring(0, 3).toLowerCase()
        : 'tip';

      // No formatear el ID
      const idUnidad = savedUnidad.id;

      const codigoCompuesto = `${categoriaNombre}-${tipoNombre}-${idUnidad}`;

      savedUnidad.codigo_com = codigoCompuesto;
      await this.unidadRepository.save(savedUnidad); // actualizar con el código generado

      const unidadDTO = await this.unidadMapper.entity2DTO(savedUnidad);
      return unidadDTO;

    } catch (error) {
      throw new BadRequestException(`Error al intentar crear Unidad: ${error.message}`);
    }
  }

  public async findById(id: number): Promise<UnidadDTO> {
    try {
      const unidad = await this.unidadRepository.findOne({
        where: { id: id },
        relations: {
          producto: true,
          ubicacion: true,
        },
      });
      if (!unidad) {
        throw new NotFoundException(`No se encontró la unidad con id ${id}`);
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
      if (!unidad) throw new NotFoundException(`No se encontró la unidad con id ${id}`);
      const updateUnidad = await this.unidadMapper.updateDTO2Entity(unidad, updateUnidadRequestDto);
      await this.unidadRepository.save(updateUnidad);
      const unidadUpdate = await this.unidadMapper.entity2DTO(updateUnidad);
      return unidadUpdate;
    } catch (error) {
      throw new BadRequestException(
        `Error al actualizar una unidad: ${error.message}`,
      );
    }
  }

  public async remove(id: number) {
    const unidad = await this.unidadRepository.findOne({ where: { id: id } });
    if (!unidad) throw new NotFoundException(`No se encontró la unidad con id ${id}`);

    try {

      await this.unidadRepository.softRemove(unidad);
      return { message: `Unidad con id ${id} eliminada correctamente` };

    } catch (error) {
      throw new BadRequestException(`Error al eliminar unidad: ${error.message}`);
    }
  }

  public async searchUnidad(request: SearchUnidadRequestDto): Promise<PageDto<UnidadDTO>> {
    try {
      const unidadPage = await this.unidadRepository.search(request);
      return this.unidadMapper.page2Dto(request, unidadPage);
    } catch (error) {
      throw new BadRequestException(`Error al buscar unidades: ${error.message}`);
    }
  }

}