import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudianteModel, EstudianteSchema } from './estudiante.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: EstudianteModel.name, schema: EstudianteSchema }])],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}
