import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import {
    ICreateFeedingSchedule,
    IUpdateFeedingSchedule,
    IUpsertFeedingSchedule,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateFeedingScheduleDto implements ICreateFeedingSchedule{
    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    dietType!: string;

    @IsString()
    @IsNotEmpty()
    time!: string;

    @IsNumber()
    @IsNotEmpty()
    frequencyPerWeek!: number;
}

export class UpsertFeedingDto implements IUpsertFeedingSchedule {
    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    dietType!: string;

    @IsString()
    @IsNotEmpty()
    time!: string;

    @IsNumber()
    @IsNotEmpty()
    frequencyPerWeek!: number;
}

export class UpdateFeedingDto implements IUpdateFeedingSchedule {
    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    dietType!: string;

    @IsString()
    @IsNotEmpty()
    time!: string;

    @IsNumber()
    @IsNotEmpty()
    frequencyPerWeek!: number;
}