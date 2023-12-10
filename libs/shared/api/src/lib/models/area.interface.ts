import { Id } from './id.type';

export interface IArea {
    _id: Id;
    nameCompound: string;
    code: string;
    sizeSquareMeter: number;
    site: string;
    vegetation: string;
    securityOn: boolean, 
}

export type ICreateArea = Pick<
    IArea,
    'nameCompound'| 'code' |'sizeSquareMeter' | 'site' | 'vegetation' | 'securityOn'
>;
export type IUpdateArea = Partial<Omit<IArea, 'id'>>;
export type IUpsertArea = IArea;