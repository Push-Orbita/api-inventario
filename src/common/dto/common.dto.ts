import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommonDTO {
    @ApiProperty({
        description: 'Id de la entidad a insertar/modificar',
        type: String,
    })
    @IsString()
    @IsOptional()
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Fecha de actualización',
        type: Date,
        default: new Date(),
    })
    @IsDate()
    @IsOptional()
    updatedAt: Date;

    @ApiProperty({
        description: 'Fecha de eliminación',
        type: Date,
        default: new Date(),
    })
    @IsDate()
    @IsOptional()
    deletedAt: Date;

}