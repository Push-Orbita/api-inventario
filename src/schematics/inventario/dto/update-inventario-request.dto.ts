import { PartialType } from '@nestjs/swagger';
import { CreateInventarioRequestDto } from './create-inventario-request.dto';

export class UpdateInventarioRequestDto extends PartialType(CreateInventarioRequestDto) {}
