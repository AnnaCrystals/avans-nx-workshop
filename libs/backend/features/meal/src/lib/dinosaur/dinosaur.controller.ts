import { DinosaurService } from './dinosaur.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IDinosaur } from '../../../../../../shared/api/src/lib/models/dinosaur.interface';
import { CreateDinosaurDto } from '../../../../../../backend/dto/src/lib/dinosaur.dto.ts';

@Controller('dinosaur')
export class DinosaurController {
    constructor(private dinosaurService: DinosaurService) {}

    @Get('')
    getAll(): IDinosaur[] {
        return this.dinosaurService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IDinosaur {
        return this.dinosaurService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateDinosaurDto): IDinosaur {
        return this.dinosaurService.create(data);
    }
}