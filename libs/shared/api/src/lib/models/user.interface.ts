import { Id } from './id.type';

export interface IUser {
    id: Id;
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date, 
    address:  string,
    occupation: string,
    isAdmin: boolean,

}

export type ICreateUser = Pick<
    IUser,
    'username' | 'email' | 'password' | 'dateOfBirth' | 'address' | 'occupation' | 'isAdmin'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;