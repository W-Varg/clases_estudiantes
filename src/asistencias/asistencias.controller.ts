import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AsistenciasService } from './asistencias.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/usuarios/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('asistencias')
export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('registrar')
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.asistenciasService.create(createAsistenciaDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('listar')
  findAll() {
    return this.asistenciasService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('detalle/:id')
  findOne(@Param('id') id: string) {
    return this.asistenciasService.findOne(id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('actualizar/:id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.asistenciasService.update(id, updateAsistenciaDto);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete('eliminar/:id')
  remove(@Param('id') id: string) {
    return this.asistenciasService.remove(id);
  }
}
