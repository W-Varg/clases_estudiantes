import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia, AsistenciaDocument } from './asistencia.model';
import { Model } from 'mongoose';
import { Materia, MateriaDocument } from 'src/materias/materia.model';
import { EstudianteDocument, EstudianteModel } from 'src/estudiantes/estudiante.model';

@Injectable()
export class AsistenciasService {
  constructor(
    @InjectModel(Asistencia.name) private readonly asistenciaCollection: Model<AsistenciaDocument>,
    @InjectModel(Materia.name) private readonly materiaCollection: Model<MateriaDocument>,
    @InjectModel(EstudianteModel.name)
    private readonly estudianteCollection: Model<EstudianteDocument>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    try {
      const materiaEncontrada = await this.materiaCollection
        .findById(createAsistenciaDto.materiaId)
        .exec();

      const estudianteEncontrado = await this.estudianteCollection
        .findById(createAsistenciaDto.estudianteId)
        .exec();

      if (!materiaEncontrada) {
        throw new Error('No se encontro la materia');
      }
      if (!estudianteEncontrado) {
        throw new Error('No se encontro el estudiante');
      }

      const datosACrear = new this.asistenciaCollection({
        fechaClase: createAsistenciaDto.fechaClase,
        materia: materiaEncontrada.id,
        estudiante: estudianteEncontrado.id,
        semestre: createAsistenciaDto.semestre,
        prefesor: createAsistenciaDto.docenteNombre,
      });

      const asistenciaRegistrada = await datosACrear.save();
      return asistenciaRegistrada;
    } catch (e) {
      // apartado de errores
      console.log('error capturado', e);

      throw e;
    }
  }

  findAll() {
    return this.asistenciaCollection
      .find()
      .populate('materia', 'id nombre')
      .populate('estudiante', 'id carnetIdentidad nombre')
      .exec();
  }

  findOne(id: string) {
    return this.asistenciaCollection
      .findById(id)
      .populate('materia', 'nombre id')
      .populate('estudiante', 'id carnetIdentidad nombre')
      .exec();
  }

  update(id: string, updateAsistenciaDto: UpdateAsistenciaDto) {
    const asistenciaEncontrada = this.asistenciaCollection.findById(id).exec();
    if (!asistenciaEncontrada) {
      throw new Error('No se encontro la asistencia');
    }

    return this.asistenciaCollection
      .updateOne(
        { _id: id },
        { ...updateAsistenciaDto, profesor: updateAsistenciaDto.docenteNombre },
      )
      .exec();
  }

  remove(id: string) {
    const asistenciaEncontrada = this.asistenciaCollection.findById(id).exec();
    if (!asistenciaEncontrada) {
      throw new Error('No se encontro la asistencia');
    }
    return this.asistenciaCollection.deleteOne({ _id: id }).exec();
  }
}
