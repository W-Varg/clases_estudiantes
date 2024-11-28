import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EstudianteModel, EstudianteSchema } from 'src/estudiantes/estudiante.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: EstudianteModel.name, schema: EstudianteSchema }])],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
