import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsString } from "class-validator";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";



export class CreateMovimientoRequestDto {

    @ApiProperty({ description: 'Nombre de la Persona que realiza el movimiento', type: String, required: true })
    @IsString()
    persona: string;

    @ApiProperty({ description: 'ID de la Unidad', type: Number })
    @IsNumber()
    unidad: number; 

    @ApiProperty({ description: 'Fecha del movimiento', type: Date })
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @ApiProperty({
        description: 'Tipo de la operacion',
        enum: TipoOperacionEnum,
        example: TipoOperacionEnum.ADQUIERE,
    })
    @IsEnum(TipoOperacionEnum)
    operacion: TipoOperacionEnum;

    @ApiProperty({ description: 'Detalles o motivo del movimiento', type: String, required: true })
    @IsString()
    detalle: string;

}
