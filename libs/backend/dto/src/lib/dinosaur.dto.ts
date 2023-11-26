import {
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import {
    ICreateDinosaur,
    IUpdateDinosaur,
    IUpsertDinosaur,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateDinosaurDto implements ICreateDinosaur {
    @IsString()
    @IsNotEmpty()
    dinoname!: string;

    @IsString()
    @IsNotEmpty()
    species!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsNumber()
    @IsNotEmpty()
    weight!: number;

    @IsNumber()
    @IsNotEmpty()
    height!: number;

   @IsString()
    @IsNotEmpty()
    dietType!: string;
}

export class UpsertDinosaurDto implements IUpsertDinosaur {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    dinoname!: string;

    @IsString()
    @IsNotEmpty()
    species!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsNumber()
    @IsNotEmpty()
    weight!: number;

    @IsNumber()
    @IsNotEmpty()
    height!: number;

   @IsString()
    @IsNotEmpty()
    dietType!: string;

}

export class UpdateDinosaurDto implements IUpdateDinosaur {
    @IsString()
    @IsNotEmpty()
    dinoname!: string;

    @IsString()
    @IsNotEmpty()
    species!: string;

    @IsDate()
    @IsNotEmpty()
    dateOfBirth!: Date;

    @IsNumber()
    @IsNotEmpty()
    weight!: number;

    @IsNumber()
    @IsNotEmpty()
    height!: number;

   @IsString()
    @IsNotEmpty()
    dietType!: string;


}