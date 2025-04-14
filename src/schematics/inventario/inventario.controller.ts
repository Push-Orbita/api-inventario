import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post()
  create(@Body() createInventarioRequestDto: CreateInventarioRequestDto) {
    return this.inventarioService.create(createInventarioRequestDto);
  }

  @Get()
  findAll() {
    return this.inventarioService.findAll();
  }



  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un inventario', description: 'Obtiene los detalles de un inventario específico mediante su ID.',})
  @ApiParam({ name: 'id', required: true, description: 'Id del inventario' })
  @ApiBadRequestResponse({ description: 'Solicitud incorrecta.' })
  @ApiNotFoundResponse({ description: 'Inventario no encontrado.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.inventarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventarioRequestDto: UpdateInventarioRequestDto) {
    return this.inventarioService.update(+id, updateInventarioRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
