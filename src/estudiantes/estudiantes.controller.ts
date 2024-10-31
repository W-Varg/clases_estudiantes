import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstudianteDatosEntrada } from './dto/estudiante.input.dto';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly serviceStd: EstudiantesService) {}

  @Post('')
  crear(@Body() datosEntrada: EstudianteDatosEntrada) {
    const respuesta = this.serviceStd.registrarEstudiante(datosEntrada);
    return respuesta;
  }

  @Get('') // method
  listar() {
    return this.serviceStd.listarEstudiantes();
  }
}
