import { ApiProperty } from '@nestjs/swagger';

export class CreateAsistenciaDto {
  @ApiProperty()
  fechaClase: Date;

  @ApiProperty()
  materiaId: string;

  // materia:{
  // id:
  // nombre:
  // }

  @ApiProperty()
  estudianteId: string;
  // estudiante:{
  // id:
  // nombreEstudiante:
  // }

  @ApiProperty()
  semestre: number;

  @ApiProperty()
  docenteNombre: string;
}
