import { NotFoundException } from '@nestjs/common';
import { IFeedingSchedule, IUpdateFeedingSchedule } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedingSchedule } from './schemas/feedingSchedule.schema';


import { Model } from 'mongoose';
@Injectable()
export class FeedingScheduleService {
    TAG = 'FeedingScheduleService';

    
    constructor(@InjectModel(FeedingSchedule.name) private feedingScheduleModel: Model<IFeedingSchedule>) {}
    private feedingSchedules$ = new BehaviorSubject<IFeedingSchedule[]>([
        {
            _id: '0',
            description: 'Mixed meat',
            dietType: 'carnivore',
            time: '9AM',
            frequencyPerWeek: 1,
        },
    ]);

    async getAll(): Promise<IFeedingSchedule[]> {
        Logger.log('getAll', this.TAG);
        return await this.feedingScheduleModel.find().exec();
    }

    async getOne(id: string): Promise<IFeedingSchedule> {
        Logger.log(`getOne(${id})`, this.TAG);
        const area = await this.feedingScheduleModel.findOne({_id: id}).exec();
        if (!area) {
            throw new NotFoundException(`FeedingSchedule could not be found!`);
        }
        return area;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(feedingSchedule: Pick<IFeedingSchedule, 'description' | 'dietType'>): Promise<IFeedingSchedule> {
        Logger.log('create', this.TAG);
        const current = this.feedingSchedules$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newFeedingSchedule: IFeedingSchedule = {
            ...feedingSchedule,
            _id: `feedingSchedule-${Math.floor(Math.random() * 10000)}`,
            time: '9AM',
            frequencyPerWeek: 1,
        };
        this.feedingSchedules$.next([...current, newFeedingSchedule]);
        return newFeedingSchedule;
    }

    async update(id: string, feedingSchedule: IUpdateFeedingSchedule): Promise<IFeedingSchedule> {
        const current = this.feedingSchedules$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
          throw new NotFoundException(`Feeding schedule with id ${id} not found`);
        }
        const updatedFeedingSchedule: IFeedingSchedule = {
          ...current[index],
          ...feedingSchedule,
        };
        current[index] = updatedFeedingSchedule;
        this.feedingSchedules$.next(current);
        return updatedFeedingSchedule;
      }

      
    async delete(id: string): Promise<void> {
        const current = this.feedingSchedules$.getValue();
        const index = current.findIndex((b) => b._id === id);
        if (index < 0) {
        throw new NotFoundException(`FeedingSchedule with id ${id} not found`);
        }
        current.splice(index, 1);
        this.feedingSchedules$.next(current);
    }
}