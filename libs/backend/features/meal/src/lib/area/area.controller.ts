import { AreaService } from './area.service';
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateAreaDto } from '@avans-nx-workshop/backend/dto';
import {UpdateAreaDto } from '@avans-nx-workshop/backend/dto';
import { IArea } from '@avans-nx-workshop/shared/api';

@Controller('area')
export class AreaController {
    constructor(private areaService: AreaService) {}

    @Get('')
    getAll(): Promise<IArea[]> {
        return this.areaService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IArea> {
        return this.areaService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateAreaDto): Promise<IArea> {
        return this.areaService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateAreaDto): Promise<IArea> {
        return this.areaService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.areaService.delete(id);
    }
}