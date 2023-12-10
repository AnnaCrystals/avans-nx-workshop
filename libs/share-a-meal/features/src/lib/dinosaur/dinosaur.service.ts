import { Injectable } from "@angular/core";
import { IDinosaur } from "@avans-nx-workshop/shared/api";
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
export class DinosaurService {
  endpoint = 'http://localhost:3000/api/dinosaur';

constructor(private readonly http:HttpClient) {

}

  private dinosaurs$ = new BehaviorSubject<IDinosaur[]>([
    {
      _id: '1',
      dinoname: 'Dino Doe',
      species: 'T-rex',
      dateOfBirth: new Date('1995-03-10'),
      weight: 55.5,
      height: 183,
      dietType: 'carnivore'
    },
    {
      _id: '2',
      dinoname: 'Raptor Red',
      species: 'Velociraptor',
      dateOfBirth: new Date('1998-07-22'),
      weight: 30.2,
      height: 150,
      dietType: 'carnivore'
    },
    {
      _id: '3',
      dinoname: 'Stego Spike',
      species: 'Stegosaurus',
      dateOfBirth: new Date('1990-05-15'),
      weight: 72.8,
      height: 210,
      dietType: 'herbivore'
    },
    {
      _id: '4',
      dinoname: 'Triceratops Thunder',
      species: 'Triceratops',
      dateOfBirth: new Date('1993-11-28'),
      weight: 65.0,
      height: 160,
      dietType: 'herbivore'
    },
    {
      _id: '5',
      dinoname: 'Ptero Soar',
      species: 'Pteranodon',
      dateOfBirth: new Date('1996-04-05'),
      weight: 20.5,
      height: 183,
      dietType: 'piscivore'
    }
    ]);

  public list(options?: any): Observable<IDinosaur[] | null> {
    // return this.dinosaurs$.asObservable();
    return this.http
    .get<ApiResponse<IDinosaur[]>>(this.endpoint, {
      ...options,
      ...httpOptions
    })
    .pipe(
      map((response: any) => response.results as IDinosaur[]),
      tap(console.log),
    )
  }

  public read(id: string | null, options?: any): Observable<IDinosaur> {
    return this.http
      .get<ApiResponse<IDinosaur>>(`${this.endpoint}/${id}`, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IDinosaur),
        catchError(error => {
          console.error('Error fetching dinosaur details:', error);
          throw error;
        })
      );
  }
  

  // public create(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
  //   this.dinosaurs$.next([ ...this.dinosaurs$.value, dinosaur ]);
  //   return of(dinosaur);
  // }
  public create(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
    return this.http
      .post<ApiResponse<IDinosaur>>(this.endpoint, dinosaur, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IDinosaur),
        catchError(error => {
          console.error('Error creating dinosaur:', error);
          throw error;
        })
      );
  }
  

  // public update(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
  //   this.dinosaurs$.next(
  //     this.dinosaurs$.value.map(u => u.id === dinosaur.id ? dinosaur : u)
  //   );
  //   return of(dinosaur);
  // }
  public update(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
    return this.http
      .put<ApiResponse<IDinosaur>>(`${this.endpoint}/${dinosaur._id}`, dinosaur, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IDinosaur),
        catchError(error => {
          console.error('Error updating dinosaur:', error);
          throw error;
        })
      );
  }
  

 public deleteDinosaur(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.dinosaurs$.getValue();
    const index = current.findIndex(u => u._id === id);
    if (index < 0) {
      //throw new NotFoundException(`Dinosaur with id ${id} not found`);
    }
    current.splice(index, 1);
    this.dinosaurs$.next(current);
  }


}