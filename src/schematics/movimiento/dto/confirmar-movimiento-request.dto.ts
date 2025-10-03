import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class ConfirmarMovimientoRequestDto {

    @ApiProperty({ 
        description: 'Confirmación de recepción del movimiento', 
        type: Boolean,
        example: true
    })
    @IsBoolean()
    @IsNotEmpty()
    confirmado: boolean;
}
