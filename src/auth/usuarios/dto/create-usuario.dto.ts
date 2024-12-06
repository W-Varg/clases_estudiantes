import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido y no puede estar vacío' })
  @ApiProperty()
  email: string;

  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
    message:
      'La contraseña debe contener al menos una mayúscula, un número y un carácter especial.',
  })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, { message: 'La contraseña debe tener como máximo 50 caracteres' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida y no puede estar vacía' })
  @ApiProperty()
  password: string; // -> "Cambiar123@"

  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
    message:
      'La contraseña debe contener al menos una mayúscula, un número y un carácter especial.',
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida y no puede estar vacía' })
  @ApiProperty()
  passwordConfirm: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido y no puede estar vacío' })
  @ApiProperty()
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsOptional()
  @ApiProperty({ required: false })
  lastName?: string;
}
