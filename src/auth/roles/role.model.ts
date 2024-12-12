import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: false })
  permisos?: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
