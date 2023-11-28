import { Module } from "@nestjs/common";
import { FeedingScheduleService } from "./feedingSchedule.service";
import { FeedingScheduleController } from "./feedingSchedule.controller";

@Module({
    controllers: [FeedingScheduleController],
    providers: [FeedingScheduleService],
    exports: [FeedingScheduleService],
})

export class feedingScheduleModule {}