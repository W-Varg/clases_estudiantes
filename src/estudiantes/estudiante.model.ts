import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum SexoEnum {
  Femenino = 'F',
  Masculino = 'M',
  Otros = 'O',
}

export type EstudianteDocument = HydratedDocument<EstudianteModel>;

// clase para la base de datos
@Schema()
export class EstudianteModel {
  @Prop() // para que guarde en la base de datos
  carnetIdentidad: string;

  @Prop({ required: true })
  nombre: string;
  @Prop()
  segundoNombre?: string;
  @Prop()
  apellidoPaterno?: string;
  @Prop()
  apellidoMaterno?: string;
  @Prop()
  fechaNacimiento: Date;
  @Prop()
  sexo: SexoEnum; //  masculino o femenino pero no valores asi: hombre, varon, macho, etc.

  @Prop({ unique: true })
  email: string;
  @Prop()
  direccion: string;
  @Prop()
  nroCelular: number;
  @Prop()
  tieneWhatsapp: boolean;
  @Prop()
  rutaFoto?: string;
  @Prop()
  estado: boolean;

  @Prop({ required: false, default: [] })
  asistencias?: [];
}

export const EstudianteSchema = SchemaFactory.createForClass(EstudianteModel);
