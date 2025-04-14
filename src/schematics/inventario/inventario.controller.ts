import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioRequestDto } from './dto/create-inventario-request.dto';
import { UpdateInventarioRequestDto } from './dto/update-inventario-request.dto';

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
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
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
