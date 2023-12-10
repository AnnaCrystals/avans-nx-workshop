import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>;

@Schema()
export class Area {

  @Prop()
  nameCompound: string;

  @Prop()
  code: string;

  @Prop()
  sizeSquareMeter: number;
  
  @Prop()
  site: string;

  @Prop()
  vegetation: string;

  @Prop()
  securityOn: boolean;

}

export const AreaSchema = SchemaFactory.createForClass(Area);