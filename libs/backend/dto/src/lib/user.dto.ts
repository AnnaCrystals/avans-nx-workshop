import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import {
    ICreateUser,
    IUpdateUser,
    IUpsertUser,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
    @IsString()
    @IsNotEmpty()
    username!: string;


}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;


}

export class UpdateUserDto implements IUpdateUser {
    @IsString()
    @IsNotEmpty()
    username!: string;


}
