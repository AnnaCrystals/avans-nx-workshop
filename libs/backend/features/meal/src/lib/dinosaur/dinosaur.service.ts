import { NotFoundException } from '@nestjs/common';
import { IDinosaur, IUpdateDinosaur } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dinosaur } from './schemas/dinosaur.schema';
import { Model } from 'mongoose';

@Injectable()
export class DinosaurService {
    TAG = 'DinosaurService';

    constructor(@InjectModel(Dinosaur.name) private dinosaurModel: Model<IDinosaur>) {}
    private dinosaurs$ = new BehaviorSubject<IDinosaur[]>([
        {
            _id: '0',
            dinoname: 'Dino Joe',
            species: 'T-rex',
            dateOfBirth: new Date('1995-03-10'),
             weight: 55.5,
            height: 183,
            dietType: 'carnivore'
        },
    ]);

    async getAll(): Promise<IDinosaur[]> {
        Logger.log('getAll', this.TAG);
        return await this.dinosaurModel.find().exec();
    }

    async getOne(id: string): Promise<IDinosaur> {
        Logger.log(`getOne(${id})`, this.TAG);
        const area = await this.dinosaurModel.findOne({_id: id}).exec();
        if (!area) {
            throw new NotFoundException(`Dinosaur could not be found!`);
        }
        return area;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(dinosaur: Pick<IDinosaur, 'dinoname' | 'species'>): Promise<IDinosaur> {
        Logger.log('create', this.TAG);
        const current = this.dinosaurs$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newDinosaur: IDinosaur = {
            ...dinosaur,
            _id: `dinosaur-${Math.floor(Math.random() * 10000)}`,
            dateOfBirth: new Date('1995-03-10'),
            weight: 55.5,
            height: 183,
            dietType: 'carnivore'
        };
        this.dinosaurs$.next([...current, newDinosaur]);
        return newDinosaur;
    }

    async update(id: string, dinosaur: IUpdateDinosaur): Promise<IDinosaur> {
        const current = this.dinosaurs$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
          throw new NotFoundException(`Dinosaur with id ${id} not found`);
        }
        const updatedDinosaur: IDinosaur = {
          ...current[index],
          ...dinosaur,
        };
        current[index] = updatedDinosaur;
        this.dinosaurs$.next(current);
        return updatedDinosaur;
      }

      
    async delete(id: string): Promise<void> {
        const current = this.dinosaurs$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
        throw new NotFoundException(`Dinosaur with id ${id} not found`);
        }
        current.splice(index, 1);
        this.dinosaurs$.next(current);
    }
}