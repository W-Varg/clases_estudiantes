import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MateriaDocument = HydratedDocument<Materia>;

@Schema()
export class Materia {
  @Prop()
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop()
  sigla: string;

  @Prop()
  estado: boolean;

  @Prop()
  niveles: number[];
}

export const MateriaSchema = SchemaFactory.createForClass(Materia);
