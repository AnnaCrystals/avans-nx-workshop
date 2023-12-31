import {
    IsBoolean,
    IsDate,
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

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    occupation!: string;

    @IsBoolean()
    @IsNotEmpty()
    isAdmin!: boolean;


}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    occupation!: string;

    @IsBoolean()
    @IsNotEmpty()
    isAdmin!: boolean;


}

export class UpdateUserDto implements IUpdateUser {
    @IsString()
    @IsNotEmpty()
    username!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsString()
    @IsNotEmpty()
    occupation!: string;

    @IsBoolean()
    @IsNotEmpty()
    isAdmin!: boolean;


}
