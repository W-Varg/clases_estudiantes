import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: false })
  lastName?: string;

  @Prop({ default: true, required: false })
  isActive: boolean;

  @Prop({ type: [String], required: false })
  rolesIds?: string[];
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
