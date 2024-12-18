import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto, LoginDTO, UpdateUsuarioDto } from './dto/create-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario, UsuarioDocument } from './usuarios.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role, RoleDocument } from '../roles/role.model';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioCollection: Model<UsuarioDocument>,
    @InjectModel(Role.name) private readonly rolesCollecion: Model<RoleDocument>,
    private jwtService: JwtService,
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

    const saltoEncript = 10; //-> sha256
    const passwordEncriptada = await bcrypt.hash(createUsuarioDto.password, saltoEncript);

    // si son iguales continuamos con la ejecucion
    const usuarioACrear = new this.usuarioCollection({
      email: createUsuarioDto.email,
      password: passwordEncriptada,
      firstName: createUsuarioDto.firstName,
      lastName: createUsuarioDto.lastName,
      isActive: true,
    });

    return await usuarioACrear.save();
  }

  async findAll() {
    return await this.usuarioCollection.find();
  }

  async login(loginDTO: LoginDTO) {
    // pepito@gmail.com
    const existeUsuario = await this.usuarioCollection.findOne({ email: loginDTO.email }).exec();
    if (!existeUsuario) {
      throw new BadRequestException('El usuario no existe');
    }

    // ya no ejecuta
    const passwordValida = await bcrypt.compare(
      loginDTO.password,
      /** hasheada -> */ existeUsuario.password,
    );
    if (!passwordValida) {
      throw new BadRequestException('Contraseña no válida');
    }

    // generar token de autenticacion
    const token = this.jwtService.sign(
      {
        id: existeUsuario.id,
        email: existeUsuario.email,
        nombre: existeUsuario.firstName,
      },
      { expiresIn: '30m' },
    );

    // devolver algunos datos del usuario
    return {
      token,
      email: existeUsuario.email,
      firstName: existeUsuario.firstName,
      lastName: existeUsuario.lastName,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} usuario`;
  // }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const rolesExistentes = await this.rolesCollecion
      .find({ _id: { $in: updateUsuarioDto.rolesIds } })
      .select('_id')
      .exec();

    const idsLimpios = rolesExistentes.map((r) => r._id);

    await this.usuarioCollection.updateOne(
      { _id: id },
      { ...updateUsuarioDto, rolesIds: idsLimpios },
    );
    return await this.usuarioCollection.findById(id);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} usuario`;
  // }
}
