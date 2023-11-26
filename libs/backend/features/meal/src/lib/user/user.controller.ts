import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IUser } from '../../../../../../shared/api/src/lib/models/user.interface';
import { CreateUserDto } from '../../../../../../backend/dto/src/lib/user.dto.ts';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    getAll(): IUser[] {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): IUser {
        return this.userService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateUserDto): IUser {
        return this.userService.create(data);
    }
}