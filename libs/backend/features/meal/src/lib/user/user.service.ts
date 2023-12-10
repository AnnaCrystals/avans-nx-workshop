import { NotFoundException } from '@nestjs/common';
import { IUser, IUpdateUser } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {
    TAG = 'UserService';

    constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}
    private users$ = new BehaviorSubject<IUser[]>([
        {
            _id: '0',
            username: 'Dino Joe',
            email: 'johnjoe@avans.nl',
            password: '1234',
            dateOfBirth: new Date('1990-01-01'),
            address: '123 Main Street',
            occupation: 'Software Developer',
            isAdmin: false,
        },
    ]);

     async getAll(): Promise<IUser[]> {
        Logger.log('getAll', this.TAG);
        return await this.userModel.find().exec();
    }

    async getOne(id: string): Promise<IUser> {
        Logger.log(`getOne(${id})`, this.TAG);
        const user = await this.userModel.findOne({_id: id}).exec();
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(user: Pick<IUser, 'username' | 'email'>): Promise<IUser> {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newUser: IUser = {
            ...user,
            _id: `user-${Math.floor(Math.random() * 10000)}`,
            password: '1234',
            dateOfBirth: new Date('1990-01-01'),
            address: '123 Main Street',
            occupation: 'Software Developer',
            isAdmin: false,
        };
        this.users$.next([...current, newUser]);
        return newUser;
    }

    async update(id: string, user: IUpdateUser): Promise<IUser> {
        const current = this.users$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
          throw new NotFoundException(`User with id ${id} not found`);
        }
        const updatedUser: IUser = {
          ...current[index],
          ...user,
        };
        current[index] = updatedUser;
        this.users$.next(current);
        return updatedUser;
      }

      
    async delete(id: string): Promise<void> {
        const current = this.users$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
        throw new NotFoundException(`User with id ${id} not found`);
        }
        current.splice(index, 1);
        this.users$.next(current);
    }
}

