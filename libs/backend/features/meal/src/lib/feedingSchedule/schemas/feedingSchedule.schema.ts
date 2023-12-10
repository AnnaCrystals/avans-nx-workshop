import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedingScheduleDocument = HydratedDocument<FeedingSchedule>;

@Schema()
export class FeedingSchedule {

  @Prop()
  description: string;

  @Prop()
  dietType: string;

  @Prop()
  time: string;

  @Prop()
  frequencyPerWeek: number;



}

export const FeedingScheduleSchema = SchemaFactory.createForClass(FeedingSchedule);
