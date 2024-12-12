import { Controller, Get, Param } from '@nestjs/common';
import { PermisosService } from './permisos.service';

@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @Get()
  findAll() {
    return this.permisosService.findAll();
  }

  @Get(':nombre')
  findOne(@Param('nombre') nom: string) {
    return this.permisosService.findOne(nom);
  }
}
