import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  Equals,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { SexoEnum } from '../estudiante.model';

// nota los decoradores de validacion solo se agregan en los dto de entrada
export class EstudianteDatosEntrada {
  @IsNotEmpty({ message: 'carnet de identidad es requerido' })
  @Length(5, 10, { message: 'carnet de identidad debe ser mayor a 5 y menor a 10 caracteres' }) // 135135-1N
  @IsString({ message: 'carnet de identidad debe ser una cadena de texto' })
  @ApiProperty()
  carnet_identidad: string;

  @IsNotEmpty({ message: 'nombre es requerido' })
  @IsString({ message: 'nombre debe ser una cadena de texto' })
  @ApiProperty()
  nombre: string;

  @IsString({ message: 'sexo debe ser una cadena de texto' })
  @IsEnum(SexoEnum, { message: 'sexo debe ser F o M u O' })
  @ApiProperty({ description: 'sexo del estudiante', enum: SexoEnum })
  sexo: SexoEnum;

  @IsNotEmpty({ message: 'fecha de nacimiento es requerido' })
  @ApiProperty({ description: 'fecha de nacimiento del estudiante' })
  fechaNacimiento: Date;

  @IsString({ message: 'nombre debe ser una cadena de texto' })
  @IsOptional({ message: 'segundo nombre es opcional' })
  @ApiProperty({ required: false })
  segundoNombre?: string;

  @IsString({ message: 'nombre debe ser una cadena de texto' })
  @IsOptional({ message: 'segundo nombre es opcional' })
  @ApiProperty({ required: false })
  apellidoPaterno?: string;

  @IsString({ message: 'nombre debe ser una cadena de texto' })
  @IsOptional({ message: 'segundo nombre es opcional' })
  @ApiProperty({ required: false })
  apellidoMaterno?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email es requerido' })
  @ApiProperty({ required: true, description: 'email del estudiante', default: 'admin@gmail.com' })
  email: string;

  @Equals('mi_casa', { message: 'direccion debe ser mi_casa' })
  @IsString({ message: 'direccion debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'direccion es requerido' })
  @ApiProperty({ required: true, default: 'mi_casa' })
  direccion: string;

  //   @MaxLength(8, { message: 'numero de celular debe tener 8 digitos maximo' })
  //   @MinLength(8, { message: 'numero de celular debe tener 8 digitos minimo' })
  @Max(80000000, { message: 'nro celular debe ser menor a 8 digitos' })
  @Min(50000000, { message: 'nro celular debe ser mayor a 6 digitos' })
  @IsInt({ message: 'nro celular debe ser un numero válido' })
  @IsNotEmpty({ message: 'nro celular es requerido' })
  @ApiProperty({ default: 74125863, required: true })
  nroCelular: number; // integer, number, 1 2 3, -1 -5

  @IsBoolean({ message: 'tieneWhatsapp debe ser true o false' })
  @IsOptional({ message: 'tieneWhatsapp es opcional' })
  @ApiProperty({
    required: false,
    default: false,
    description: 'indica si es estudiante tiene o no whatsapp',
  })
  tieneWhatsapp?: boolean;
}

export class EstudianteDatosEntradaActualizar extends PartialType(EstudianteDatosEntrada) {}
