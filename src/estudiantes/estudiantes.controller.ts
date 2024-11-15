import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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

  @Get('search') // method
  buscar(@Query('numero-documento') ci?: string, @Query('texto') nombreOApellido?: string) {
    return this.serviceStd.buscarEstudiante(ci, nombreOApellido);
  }

  @Get(':identificador') // method
  detalle(@Param('identificador') _id: string) {
    return this.serviceStd.detalleEstudiante(_id);
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
  eliminar(@Param('id') _id: string) {
    const respuesta = this.serviceStd.eliminarEstudiante(_id);
    return respuesta;
  }
}
