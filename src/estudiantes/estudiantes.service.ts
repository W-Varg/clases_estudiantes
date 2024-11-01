import { Injectable } from '@nestjs/common';
import { EstudianteDatosEntrada } from './dto/estudiante.input.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EstudianteModel } from './estudiante.model';
import { Model } from 'mongoose';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectModel(EstudianteModel.name)
    private readonly estudianteCollection: Model<EstudianteModel>,
  ) {}

  registrarEstudiante(datosEntrada: EstudianteDatosEntrada) {
    const datosParaGuardar = new this.estudianteCollection({
      nombre: datosEntrada.nombre,
      carnetIdentidad: datosEntrada.carnet_identidad,
      segundoNombre: datosEntrada.segundoNombre,
      apellidoPaterno: datosEntrada.apellidoPaterno,
      apellidoMaterno: datosEntrada.apellidoMaterno,
      fechaNacimiento: datosEntrada.fechaNacimiento,
      // nota: 247, // valor que la libreria de descarta para no guardar
      sexo: datosEntrada.sexo,
      email: datosEntrada.email,
      direccion: datosEntrada.direccion,
      nroCelular: datosEntrada.nroCelular,
      tieneWhatsapp: datosEntrada.tieneWhatsapp,
      estado: true,
    });

    // const clientCollection = [
    //   {
    //     id: 1,
    //     nombre: 'Cristian',
    //     apellido: 'Garcia',
    //   },
    //   {
    //     id: 2,
    //     nombre: 'Wilber',
    //     apellido: 'Garron',
    //   },
    // ];

    // const ventaColleccion = {
    //   id: 1,
    //   fechaVenta: new Date(),
    //   // clientId: 1,
    //   cliente: {
    //     id: 1,
    //     nombre: 'Cristian',
    //     apellido: 'Garcia',
    //   },
    //   items: [
    //     { id: 1, nombre: 'procesar', precio: 10, cantidad: 2 },
    //     { id: 2, nombre: 'laptop', precio: 10, cantidad: 2 },
    //     { id: 2, nombre: 'monitor', precio: 10, cantidad: 2 },
    //   ],
    // };

    const resultado = datosParaGuardar.save(); // guarda en la base de datos
    return resultado;
  }

  listarEstudiantes() {
    const listaEstudiantesResult = this.estudianteCollection.find();
    return listaEstudiantesResult;
  }

  async actualizarEstudiante(id: string) {
    const estudianteEncontrado = await this.estudianteCollection.findById(id);
    if (estudianteEncontrado) {
      estudianteEncontrado.tieneWhatsapp = !estudianteEncontrado.tieneWhatsapp;
      return await this.estudianteCollection.updateOne({ _id: id }, estudianteEncontrado).exec();
    } else {
      throw new Error('No se encontro el estudiante');
    }
  }

  eliminarEstudiante(id: string) {
    const estudianteEncontrado = this.estudianteCollection.findById(id);
    if (estudianteEncontrado) {
      return this.estudianteCollection.deleteOne({ id }).exec();
    } else {
      throw new Error('No se encontro el estudiante');
    }
  }
}
