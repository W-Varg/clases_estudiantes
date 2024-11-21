import { Module } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { AsistenciasController } from './asistencias.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './asistencia.model';
import { Materia, MateriaSchema } from 'src/materias/materia.model';
import { EstudianteModel, EstudianteSchema } from 'src/estudiantes/estudiante.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asistencia.name, schema: AsistenciaSchema },
      { name: Materia.name, schema: MateriaSchema },
      { name: EstudianteModel.name, schema: EstudianteSchema },
    ]),
  ],
  controllers: [AsistenciasController],
  providers: [AsistenciasService],
})
export class AsistenciasModule {}
