import { Module } from "@nestjs/common";
import { FeedingScheduleService } from "./feedingSchedule.service";
import { FeedingScheduleController } from "./feedingSchedule.controller";
import { MongooseModule } from '@nestjs/mongoose';
import { FeedingScheduleSchema, FeedingSchedule } from './schemas/feedingSchedule.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'FeedingSchedule', schema: FeedingScheduleSchema }])] ,
      controllers: [FeedingScheduleController],
      providers: [FeedingScheduleService],
      exports: [FeedingScheduleService],
})


export class feedingScheduleModule {}
