import { AreaService } from './area.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IArea } from '../../../../../../shared/api/src/lib/models/area.interface';
import { CreateAreaDto } from '../../../../../../backend/dto/src/lib/area.dto.ts';

@Controller('area')
export class AreaController {
    constructor(private areaService: AreaService) {}

    @Get('')
    getAll(): IArea[] {
        return this.areaService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IArea {
        return this.areaService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateAreaDto): IArea {
        return this.areaService.create(data);
    }
}