import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateRoleDto {
  @MinLength(2, { message: 'El rol debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El rol debe tener como máximo 50 caracteres' })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El rol es requerida y no puede estar vacía' })
  @ApiProperty()
  nombre: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
