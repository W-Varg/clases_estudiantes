import { Controller, Get, Post } from '@nestjs/common';

@Controller('estudiantes')
export class EstudiantesController {
  constructor() {}

  @Get('') // method
  listar() {
    return [];
  }

  @Post('')
  crear() {
    return {};
  }
}
