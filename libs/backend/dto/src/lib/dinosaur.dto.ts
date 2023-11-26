import {
    IsNotEmpty,
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

}

export class UpsertDinosaurDto implements IUpsertDinosaur {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    dinoname!: string;

}

export class UpdateDinosaurDto implements IUpdateDinosaur {
    @IsString()
    @IsNotEmpty()
    dinoname!: string;


}