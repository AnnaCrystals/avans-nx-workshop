import { NotFoundException } from '@nestjs/common';
import { IFeedingSchedule } from '../../../../../../shared/api/src/lib/models/feedingSchedule.interface';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Injectable } from "@angular/core";

@Injectable()
export class FeedingScheduleService {
    TAG = 'FeedingScheduleService';

    private feedingSchedules$ = new BehaviorSubject<IFeedingSchedule[]>([
        {
            id: '0',
            description: 'Mixed meat',
            dietType: 'carnivore',
            time: '9AM',
            frequencyPerWeek: 1,
        },
    ]);

    getAll(): IFeedingSchedule[] {
        Logger.log('getAll', this.TAG);
        return this.feedingSchedules$.value;
    }

    getOne(id: string): IFeedingSchedule {
        Logger.log(`getOne(${id})`, this.TAG);
        const feedingSchedule = this.feedingSchedules$.value.find((td) => td.id === id);
        if (!feedingSchedule) {
            throw new NotFoundException(`FeedingSchedule could not be found!`);
        }
        return feedingSchedule;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(feedingSchedule: Pick<IFeedingSchedule, 'description' | 'dietType'>): IFeedingSchedule {
        Logger.log('create', this.TAG);
        const current = this.feedingSchedules$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newFeedingSchedule: IFeedingSchedule = {
            ...feedingSchedule,
            id: `feedingSchedule-${Math.floor(Math.random() * 10000)}`,
            time: '9AM',
            frequencyPerWeek: 1,
        };
        this.feedingSchedules$.next([...current, newFeedingSchedule]);
        return newFeedingSchedule;
    }
}