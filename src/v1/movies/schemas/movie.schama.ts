import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type MovieDocument = Movie & Document
@Schema({ autoCreate: true, timestamps: true })
export class Movie {
  @Prop()
  name: string;

  @Prop()
  genera: string;

  @Prop()
  releaseDate: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
