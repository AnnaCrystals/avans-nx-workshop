import { Injectable } from "@angular/core";
import { IArea } from "@avans-nx-workshop/shared/api";
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
export class AreaService {
  endpoint = 'http://localhost:3000/api/area';

constructor(private readonly http:HttpClient) {

}

private areas$ = new BehaviorSubject<IArea[]>([
  {
    _id: '1',
    nameCompound: 'T-rex paddock',
    code: 'TREX-17',
    sizeSquareMeter: 2000,
    site: 'B',
    vegetation: 'jungle',
    securityOn: true,
  },
  {
      _id: '2',
      nameCompound: 'Velociraptor Enclosure',
      code: 'VELO-22',
      sizeSquareMeter: 1800,
      site: 'C',
      vegetation: 'dense forest',
      securityOn: true,
  },
  {
      _id: '3',
      nameCompound: 'Triceratops Habitat',
      code: 'TRIC-10',
      sizeSquareMeter: 2500,
      site: 'A',
      vegetation: 'grassy plains',
      securityOn: true,
  },
  {
      _id: '4',
      nameCompound: 'Stegosaurus Zone',
      code: 'STEG-14',
      sizeSquareMeter: 1800,
      site: 'D',
      vegetation: 'wooded area',
      securityOn: true,
  },
  {
      _id: '5',
      nameCompound: 'Pterodactyl Aviary',
      code: 'PTER-08',
      sizeSquareMeter: 1500,
      site: 'E',
      vegetation: 'cliffs and caves',
      securityOn: true,
  }
  ]);

    public list(options?: any): Observable<IArea[] | null> {
      // return this.dinosaurs$.asObservable();
      return this.http
      .get<ApiResponse<IArea[]>>(this.endpoint, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IArea[]),
        tap(console.log),
      )
    }

    public read(id: string | null, options?: any): Observable<IArea> {
      return this.http
        .get<ApiResponse<IArea>>(`${this.endpoint}/${id}`, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IArea),
          catchError(error => {
            console.error('Error fetching area details:', error);
            throw error;
          })
        );
    }


    public create(area: IArea, options?: any): Observable<IArea> {
      return this.http
        .post<ApiResponse<IArea>>(this.endpoint, area, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IArea),
          tap(console.log),
          catchError(error => {
            console.error('Error creating area:', error);
            throw error;
          })
        );
    }

    public update(area: IArea, options?: any): Observable<IArea> {
      console.log('Endpoint:', `${this.endpoint}/${area._id}`, area);
      return this.http
        .put<ApiResponse<IArea>>(`${this.endpoint}/${area._id}`, area, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IArea),
          tap(console.log),
          catchError(error => {
            console.error('Error updating area:', error);
            throw error;
          })
        );
    }


  public deleteArea(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.areas$.getValue();
    const index = current.findIndex(u => u._id === id);
    if (index < 0) {
      //throw new NotFoundException(`User with id ${id} not found`);
    }
    current.splice(index, 1);
    this.areas$.next(current);
  }
}