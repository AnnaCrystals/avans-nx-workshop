import { Injectable } from "@angular/core";
import { IFeedingSchedule } from "@avans-nx-workshop/shared/api";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import {throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMeal } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
}

@Injectable()
export class FeedingScheduleService {
  endpoint = 'http://localhost:3000/api/feedingSchedule';

constructor(private readonly http:HttpClient) {

}

  private feedingSchedules$ = new BehaviorSubject<IFeedingSchedule[]>([
    {
      _id: '1',
      description: 'lamb meat',
      dietType: 'Carnivore',
      time: '9AM',
      frequencyPerWeek: 0.5,
    },
    {
        _id: '2',
        description: 'fish fillet',
        dietType: 'Piscivore',
        time: '3PM',
        frequencyPerWeek: 0.3,
    },
    {
        _id: '3',
        description: 'leafy greens',
        dietType: 'Herbivore',
        time: '12PM',
        frequencyPerWeek: 0.8
    },
    {
        _id: '4',
        description: 'insects and grubs',
        dietType: 'Insectivore',
        time: '6AM',
        frequencyPerWeek: 0.6
    },
    {
        _id: '5',
        description: 'mixed fruits',
        dietType: 'Omnivore',
        time: '2PM',
        frequencyPerWeek: 0.4
    }
    ]);

    public list(options?: any): Observable<IFeedingSchedule[] | null> {
      // return this.dinosaurs$.asObservable();
      return this.http
      .get<ApiResponse<IFeedingSchedule[]>>(this.endpoint, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IFeedingSchedule[]),
        tap(console.log),
      )
    }

    public read(id: string | null, options?: any): Observable<IFeedingSchedule> {
      return this.http
        .get<ApiResponse<IFeedingSchedule>>(`${this.endpoint}/${id}`, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IFeedingSchedule),
          catchError(error => {
            console.error('Error fetching feedingSchedule details:', error);
            throw error;
          })
        );
    }


    public create(feedingSchedule: IFeedingSchedule, options?: any): Observable<IFeedingSchedule> {
      return this.http
        .post<ApiResponse<IFeedingSchedule>>(this.endpoint, feedingSchedule, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IFeedingSchedule),
          catchError(error => {
            console.error('Error creating feedingSchedule:', error);
            throw error;
          })
        );
    }

    public update(feedingSchedule: IFeedingSchedule, options?: any): Observable<IFeedingSchedule> {
      return this.http
        .put<ApiResponse<IFeedingSchedule>>(`${this.endpoint}/${feedingSchedule._id}`, feedingSchedule, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IFeedingSchedule),
          catchError(error => {
            console.error('Error updating feedingSchedule:', error);
            throw error;
          })
        );
    }

  public deleteFeedingSchedule(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.feedingSchedules$.getValue();
    const index = current.findIndex(u => u._id === id);
    if (index < 0) {
      //throw new NotFoundException(`User with id ${id} not found`);
    }
    current.splice(index, 1);
    this.feedingSchedules$.next(current);
  }
}

