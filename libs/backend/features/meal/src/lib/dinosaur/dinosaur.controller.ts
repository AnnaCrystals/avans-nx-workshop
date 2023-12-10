import { DinosaurService } from './dinosaur.service';
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { IDinosaur } from '@avans-nx-workshop/shared/api';
import { CreateDinosaurDto, UpdateDinosaurDto } from '@avans-nx-workshop/backend/dto';

//import { CreateDinosaurDto } from '../../../../../../backend/dto/src/lib/dinosaur.dto.ts';

@Controller('dinosaur')
export class DinosaurController {
    constructor(private readonly dinosaurService: DinosaurService) {}

    @Get('')
    getAll(): Promise<IDinosaur[]> {
        console.log('ssssd')
        return this.dinosaurService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IDinosaur> {
        return this.dinosaurService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateDinosaurDto): Promise<IDinosaur> {
        return this.dinosaurService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateDinosaurDto): Promise<IDinosaur> {
        return this.dinosaurService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.dinosaurService.delete(id);
    }
}