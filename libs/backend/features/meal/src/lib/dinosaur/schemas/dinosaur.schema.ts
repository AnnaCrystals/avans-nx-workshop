import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DinosaurDocument = HydratedDocument<Dinosaur>;

@Schema()
export class Dinosaur {

  @Prop()
  dinoname: string;

  @Prop()
  species: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  weight: number;

  @Prop()
  height: number;

  @Prop()
  dietType: string;

}

export const DinosaurSchema = SchemaFactory.createForClass(Dinosaur);