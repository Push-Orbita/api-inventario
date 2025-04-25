import { PartialType } from '@nestjs/swagger';
import { CreateUnidadRequestDto } from './create-unidad-request.dto';

export class UpdateUnidadDto extends PartialType(CreateUnidadRequestDto) {}
