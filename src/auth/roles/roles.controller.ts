import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.input.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../usuarios/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('registrar')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('listar')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('detalle/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch('editar/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete('eliminar/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
