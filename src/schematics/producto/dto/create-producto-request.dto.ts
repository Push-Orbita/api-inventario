import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';


export class CreateProductoRequestDto {

    @ApiProperty({ description: 'Nombre del producto', type: String, required: true })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Fecha de adquisición del producto', type: Date })
    @IsDate()
    @Type(() => Date) // <- esto convierte el string ISO en un objeto Date
    fechaAdquisicion: Date;

    @ApiProperty({ description: 'Caracteristicas del producto', type: String })
    @IsString()
    @IsOptional()
    caracteristicas: string;


    @ApiProperty({ description: 'ID del modelo del producto', type: Number })
    @IsNumber()
    @IsOptional()
    modelo: number;


    @ApiProperty({ description: 'ID de la marca del producto', type: Number })
    @IsNumber()
    @IsOptional()
    marca: number;
    

    @ApiProperty({ description: 'ID del tipo de producto', type: Number })
    @IsNumber()
    @IsOptional()
    tipo: number;


    @ApiProperty({ description: 'ID de la categoría del producto', type: Number })
    @IsNumber()
    @IsOptional()
    categoria: number;

}