import { FeedingScheduleService } from './feedingSchedule.service';
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateFeedingScheduleDto, UpdateFeedingScheduleDto } from '@avans-nx-workshop/backend/dto';
import { IFeedingSchedule } from '@avans-nx-workshop/shared/api';

@Controller('feedingSchedule')
export class FeedingScheduleController {
    constructor(private feedingScheduleService: FeedingScheduleService) {}

    @Get('')
    getAll(): Promise<IFeedingSchedule[]> {
        return this.feedingScheduleService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IFeedingSchedule> {
        return this.feedingScheduleService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateFeedingScheduleDto): Promise<IFeedingSchedule> {
        return this.feedingScheduleService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateFeedingScheduleDto): Promise<IFeedingSchedule> {
        return this.feedingScheduleService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.feedingScheduleService.delete(id);
    }
}