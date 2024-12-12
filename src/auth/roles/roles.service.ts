import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.input.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.model';
import { Model } from 'mongoose';
import { permisosArray } from '../permisos/permisos.array';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private readonly roleCollection: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto) {
    // solo tomando en cuenta los permisos que coincidenc con el array de permisos definidos
    const permisosEncontrados = permisosArray.filter((permiso) =>
      createRoleDto.permisos.includes(permiso),
    );

    const roleACrear = new this.roleCollection({
      nombre: createRoleDto.nombre,
      permisos: permisosEncontrados,
    });

    const rolCreado = await roleACrear.save();
    return rolCreado;
  }

  findAll() {
    return this.roleCollection.find();
  }

  findOne(id: string) {
    return this.roleCollection.findById(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    // solo tomando en cuenta los permisos que coincidenc con el array de permisos definidos
    const permisosEncontrados = permisosArray.filter((permiso) =>
      updateRoleDto.permisos.includes(permiso),
    );

    await this.roleCollection.updateOne(
      { _id: id },
      { ...updateRoleDto, permisos: permisosEncontrados },
    );
    return this.roleCollection.findById(id);
  }

  remove(id: string) {
    return this.roleCollection.deleteOne({ _id: id });
  }
}
