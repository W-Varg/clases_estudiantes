import { Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dto/roles.input.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './role.model';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private readonly roleCollection: Model<RoleDocument>) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleACrear = new this.roleCollection({ nombre: createRoleDto.nombre });
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
    await this.roleCollection.updateOne({ _id: id }, updateRoleDto);
    return this.roleCollection.findById(id);
  }

  remove(id: string) {
    return this.roleCollection.deleteOne({ _id: id });
  }
}
