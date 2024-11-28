import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EstudianteDocument, EstudianteModel } from 'src/estudiantes/estudiante.model';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(EstudianteModel.name)
    private readonly estudianteCollection: Model<EstudianteDocument>,
  ) {}

  async estudiantePorEdad() {
    const estudiantes = await this.estudianteCollection.find({});
    let menores = 0;
    let adultos = 0;
    let terceraEdad = 0;
    estudiantes.forEach((est) => {
      const edad = new Date().getFullYear() - new Date(est.fechaNacimiento).getFullYear();
      if (edad < 18) {
        menores++;
      }
      if (edad >= 18 && edad < 50) {
        adultos++;
      }
      if (edad >= 50) {
        terceraEdad++;
      }
    });

    return {
      labels: ['menores de 18', 'adultos', 'tercera edad'],
      data: [menores, adultos, terceraEdad],
    };
  }
}
