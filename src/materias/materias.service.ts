import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Materia, MateriaDocument } from './materia.model';
import { Model } from 'mongoose';

@Injectable()
export class MateriasService {
  constructor(
    @InjectModel(Materia.name)
    private readonly materiaCollection: Model<MateriaDocument>,
  ) {}
  async create(createMateriaDto: CreateMateriaDto) {
    const materiaACrear = new this.materiaCollection({
      nombre: createMateriaDto.nombre,
      descripcion: createMateriaDto.descripcion,
      sigla: createMateriaDto.sigla,
      niveles: createMateriaDto.niveles,
      estado: true,
    });
    return await materiaACrear.save();
  }

  async findAll() {
    return await this.materiaCollection.find();
  }

  async findOne(id: string) {
    return await this.materiaCollection.findById(id);
  }

  async update(id: string, updateMateriaDto: UpdateMateriaDto) {
    const existeMateria = await this.materiaCollection.findById(id);
    if (existeMateria === null) {
      throw new Error('No se encontro la materia');
    }
    return await this.materiaCollection.updateOne({ _id: id }, updateMateriaDto);
  }

  async remove(id: string) {
    const existeMateria = await this.materiaCollection.findById(id);
    if (existeMateria === null) {
      throw new Error('No se encontro la materia');
    }
    return await this.materiaCollection.deleteOne({ _id: id }).exec();
  }
}
