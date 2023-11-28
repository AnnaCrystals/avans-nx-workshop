import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import {
    ICreateArea,
    IUpdateArea,
    IUpsertArea,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateAreaDto implements ICreateArea {
    @IsString()
    @IsNotEmpty()
    nameCompound!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsNumber()
    @IsNotEmpty()
    sizeSquareMeter!: number;

    @IsString()
    @IsNotEmpty()
    site!: string;

    @IsString()
    @IsNotEmpty()
    vegetation!: string;

    @IsBoolean()
    @IsNotEmpty()
    securityOn!: boolean;

}

export class UpsertAreaDto implements IUpsertArea {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    nameCompound!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsNumber()
    @IsNotEmpty()
    sizeSquareMeter!: number;

    @IsString()
    @IsNotEmpty()
    site!: string;

    @IsString()
    @IsNotEmpty()
    vegetation!: string;

    @IsBoolean()
    @IsNotEmpty()
    securityOn!: boolean;

}

export class UpdateAreaDto implements IUpdateArea {
    @IsString()
    @IsNotEmpty()
    nameCompound!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsNumber()
    @IsNotEmpty()
    sizeSquareMeter!: number;

    @IsString()
    @IsNotEmpty()
    site!: string;

    @IsString()
    @IsNotEmpty()
    vegetation!: string;

    @IsBoolean()
    @IsNotEmpty()
    securityOn!: boolean;

}