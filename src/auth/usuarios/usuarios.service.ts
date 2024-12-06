import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuarios.model';
import { Model } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioCollection: Model<UsuarioDocument>,
  ) {}

  async registrarUsuario(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.password !== createUsuarioDto.passwordConfirm)
      throw new BadRequestException('Las contraseñas no coinciden');

    const usuarioEncontrado = await this.usuarioCollection.findOne({
      email: createUsuarioDto.email,
    });
    if (usuarioEncontrado) {
      throw new BadRequestException('El usuario ya existe con ese email');
    }

    // si son iguales continuamos con la ejecucion
    const usuarioACrear = new this.usuarioCollection({
      email: createUsuarioDto.email,
      password: createUsuarioDto.password,
      firstName: createUsuarioDto.firstName,
      lastName: createUsuarioDto.lastName,
      isActive: true,
    });

    return await usuarioACrear.save();
  }

  async findAll() {
    return await this.usuarioCollection.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  // update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  //   return `This action updates a #${id} usuario`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
