import { Injectable } from '@nestjs/common';
import { EstudianteDatosEntrada } from './dto/estudiante.input.dto';

@Injectable()
export class EstudiantesService {
  registrarEstudiante(datosEntrada: EstudianteDatosEntrada) {
    console.log('paso por aqui');
    return datosEntrada;
  }

  listarEstudiantes() {
    return [];
  }
}
