import { Id } from './id.type';

export interface IDinosaur {
    _id: Id;
    dinoname: string;
    species: string;
    dateOfBirth: Date;
    weight: number;
    height: number;
    dietType: string;
    


}

export type ICreateDinosaur = Pick<
    IDinosaur,
    'dinoname' | 'species' | 'dateOfBirth' | 'weight' | 'height'| 'dietType'
>;
export type IUpdateDinosaur = Partial<Omit<IDinosaur, 'id'>>;
export type IUpsertDinosaur = IDinosaur;