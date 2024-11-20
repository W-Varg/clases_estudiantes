import { ApiProperty } from '@nestjs/swagger';

export class CreateMateriaDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty()
  sigla: string;

  @ApiProperty({ type: () => [Number] })
  niveles: number[];
}
