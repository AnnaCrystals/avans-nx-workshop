import { Id } from './id.type';

export interface IFeedingSchedule {
    id: Id;
    description: string,
    dietType: string,
    time: string,
    frequencyPerWeek: number,
}

export type ICreateFeedingSchedule = Pick<
    IFeedingSchedule,
    'description' | 'dietType' | 'time' | 'frequencyPerWeek'
>;
export type IUpdateFeedingSchedule= Partial<Omit<IFeedingSchedule, 'id'>>;
export type IUpsertFeedingSchedule = IFeedingSchedule;