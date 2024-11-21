import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AsistenciaDocument = HydratedDocument<Asistencia>;

@Schema()
export class Asistencia {
  @Prop()
  fechaClase: Date;

  @Prop({ type: Types.ObjectId, ref: 'Materia', required: true })
  'materia': Types.ObjectId; // ref de tipo cadena

  @Prop({ type: Types.ObjectId, ref: 'EstudianteModel', required: true })
  'estudiante': Types.ObjectId; // ref de tipo cadena

  @Prop({ required: true })
  semestre: number;

  @Prop()
  prefesor: string;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);
