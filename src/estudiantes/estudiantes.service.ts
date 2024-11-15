import { Injectable } from '@nestjs/common';
import {
  EstudianteDatosEntrada,
  EstudianteDatosEntradaActualizar,
} from './dto/estudiante.input.dto';
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

  async buscarEstudiante(carnetIdentidad?: string, nombreOApellido?: string) {
    if (carnetIdentidad && carnetIdentidad.length >= 1) {
      const estudiantes = await this.estudianteCollection.find({
        carnetIdentidad: carnetIdentidad,
      });
      return estudiantes;
    }

    if (nombreOApellido && nombreOApellido.length >= 1) {
      const estudiantes = await this.estudianteCollection.find({
        $or: [
          { nombre: { $regex: nombreOApellido, $options: 'i' } },
          { apellidoPaterno: { $regex: nombreOApellido, $options: 'i' } },
          { apellidoMaterno: { $regex: nombreOApellido, $options: 'i' } },
        ],
      });
      return estudiantes;
    }

    return await this.estudianteCollection.find({});
  }

  async detalleEstudiante(id: string) {
    return await this.estudianteCollection.findById(id);
  }

  async actualizarEstudiante(id: string, datosEntradaUpdate: EstudianteDatosEntradaActualizar) {
    const estudianteEncontrado = await this.estudianteCollection.findById(id);
    if (estudianteEncontrado) {
      console.log(datosEntradaUpdate);

      estudianteEncontrado.nombre = datosEntradaUpdate.nombre;
      estudianteEncontrado.segundoNombre = datosEntradaUpdate.segundoNombre;
      estudianteEncontrado.carnetIdentidad = datosEntradaUpdate.carnet_identidad;
      estudianteEncontrado.apellidoPaterno = datosEntradaUpdate.apellidoPaterno;
      estudianteEncontrado.apellidoMaterno = datosEntradaUpdate.apellidoMaterno;
      estudianteEncontrado.email = datosEntradaUpdate.email;
      estudianteEncontrado.nroCelular = datosEntradaUpdate.nroCelular;
      estudianteEncontrado.direccion = datosEntradaUpdate.direccion;
      estudianteEncontrado.sexo = datosEntradaUpdate.sexo;
      estudianteEncontrado.tieneWhatsapp = !estudianteEncontrado.tieneWhatsapp;

      await estudianteEncontrado.save(); // guardar

      return await this.estudianteCollection.findOne({ _id: id }).exec();
    } else {
      throw new Error('No se encontro el estudiante');
    }
  }

  async eliminarEstudiante(id: string) {
    const estudianteEncontrado = await this.estudianteCollection.findById(id); // retardo
    if (estudianteEncontrado) {
      const result = await this.estudianteCollection.deleteOne({ _id: id }).exec();
      return result;
    } else {
      throw new Error('No se encontro el estudiante');
    }
  }
}
