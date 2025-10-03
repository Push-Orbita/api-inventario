import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";
import { TipoOperacionEnum } from "src/common/enums/tipo-operacion.enum";

export class CreateBulkMovimientosRequestDto {

    userId: number;

    @ApiProperty({ description: 'ID de la Persona que realiza el movimiento', type: Number, required: true })
    @IsNumber()
    @IsNotEmpty()
    persona: number;

    @ApiProperty({ description: 'Fecha del movimiento', type: Date })
    @IsDate()
    @Type(() => Date)
    fecha: Date;

    @ApiProperty({ 
        description: 'Array de IDs de las Unidades', 
        type: [Number],
        example: [101, 102, 103]
    })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsNotEmpty()
    unidades: number[];

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

    @ApiProperty({ 
        description: 'Confirmación de recepción (solo para operaciones CEDIÓ)', 
        type: Boolean,
        required: false
    })
    @IsOptional()
    @IsBoolean()
    confirmado?: boolean;
}
