import { UserService } from './user.service';
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { IUser } from '@avans-nx-workshop/shared/api';

//import { CreateUserDto } from '../../../../../../backend/dto/src/lib/user.dto.ts';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('')
    getAll(): Promise<IUser[]> {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<IUser> {
        return this.userService.getOne(id);
    }

    @Post('')
    create(@Body() data: CreateUserDto): Promise<IUser> {
        return this.userService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUser> {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id);
    }
}