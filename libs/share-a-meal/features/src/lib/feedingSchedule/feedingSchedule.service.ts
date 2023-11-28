import { Injectable } from "@angular/core";
import { IFeedingSchedule } from "@avans-nx-workshop/shared/api";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import {throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMeal } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';

@Injectable()
export class FeedingScheduleService {

  private feedingSchedules$ = new BehaviorSubject<IFeedingSchedule[]>([
    {
      id: '1',
      description: 'lamb meat',
      dietType: 'Carnivore',
      time: '9AM',
      frequencyPerWeek: 0.5,
    },
    {
        id: '2',
        description: 'fish fillet',
        dietType: 'Piscivore',
        time: '3PM',
        frequencyPerWeek: 0.3,
    },
    {
        id: '3',
        description: 'leafy greens',
        dietType: 'Herbivore',
        time: '12PM',
        frequencyPerWeek: 0.8
    },
    {
        id: '4',
        description: 'insects and grubs',
        dietType: 'Insectivore',
        time: '6AM',
        frequencyPerWeek: 0.6
    },
    {
        id: '5',
        description: 'mixed fruits',
        dietType: 'Omnivore',
        time: '2PM',
        frequencyPerWeek: 0.4
    }

    ]);

  public list(options?: any): Observable<IFeedingSchedule[] | null> {
    return this.feedingSchedules$.asObservable();
  }

  public read(id: string | null, options?: any): Observable<IFeedingSchedule> {
    return this.feedingSchedules$.asObservable().pipe(
      map(feedingSchedules => {
        const foundFeedingSchedule = feedingSchedules.find(feedingSchedule => feedingSchedule.id === id);
        if (!foundFeedingSchedule) {
          throw new Error('FeedingSchedule not found');
        }
        return foundFeedingSchedule;
      })
    );
  }
  public create(feedingSchedule: IFeedingSchedule, options?: any): Observable<IFeedingSchedule> {
    this.feedingSchedules$.next([ ...this.feedingSchedules$.value, feedingSchedule ]);
    return of(feedingSchedule);
  }

  public update(feedingSchedule: IFeedingSchedule, options?: any): Observable<IFeedingSchedule> {
    this.feedingSchedules$.next(
      this.feedingSchedules$.value.map(u => u.id === feedingSchedule.id ? feedingSchedule : u)
    );
    return of(feedingSchedule);
  }

 public deleteFeedingSchedule(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.feedingSchedules$.getValue();
    const index = current.findIndex(u => u.id === id);
    if (index < 0) {
      //throw new NotFoundException(`FeedingSchedule with id ${id} not found`);
    }
    current.splice(index, 1);
    this.feedingSchedules$.next(current);
  }



}