import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {
  EstudianteDatosEntrada,
  EstudianteDatosEntradaActualizar,
} from './dto/estudiante.input.dto';
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

  @Patch(':identificador') // method
  actualizar(
    @Param('identificador') id: string,
    @Body() datosPaActualizar: EstudianteDatosEntradaActualizar,
  ) {
    const respuesta = this.serviceStd.actualizarEstudiante(id, datosPaActualizar);
    return respuesta;
  }

  @Delete(':id') // method
  eliminar(@Param('id') id: string) {
    const respuesta = this.serviceStd.eliminarEstudiante(id);
    return respuesta;
  }
}
