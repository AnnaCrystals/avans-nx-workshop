import { Id } from './id.type';

export interface IUser {
    id: Id;
    username: string;
    email: string;
    password: string;
    profilePicture: string;

}

export type ICreateUser = Pick<
    IUser,
    'username' | 'email' | 'password' | 'profilePicture'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;