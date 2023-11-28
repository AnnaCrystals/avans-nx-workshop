import { FeedingScheduleService } from './feedingSchedule.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IFeedingSchedule } from '../../../../../../shared/api/src/lib/models/feedingSchedule.interface';
import { CreateFeedingScheduleDto } from '../../../../../../backend/dto/src/lib/feedingSchedule.dto';

@Controller('feedingSchedule')
export class FeedingScheduleController {
    constructor(private feedingScheduleService: FeedingScheduleService) {}

    @Get('')
    getAll(): IFeedingSchedule[] {
        return this.feedingScheduleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IFeedingSchedule {
        return this.feedingScheduleService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateFeedingScheduleDto): IFeedingSchedule {
        return this.feedingScheduleService.create(data);
    }
}