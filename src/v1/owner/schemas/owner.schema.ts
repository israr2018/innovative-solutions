import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type OwnerDocument = Owner & Document
@Schema({ autoCreate: true, timestamps: true })
export class Owner {
  @Prop()
  name: string;

  @Prop()
  gender: string;
  
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
