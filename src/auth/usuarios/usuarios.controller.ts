import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, LoginDTO } from './dto/create-usuario.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registrar')
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.registrarUsuario(createUsuarioDto);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.usuariosService.login(loginDTO);
  }

  @Get('listar')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findAll() {
    // se ejecuta antes de ingresar a esta linea de codigo
    return this.usuariosService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usuariosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuariosService.update(+id, updateUsuarioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usuariosService.remove(+id);
  // }
}
