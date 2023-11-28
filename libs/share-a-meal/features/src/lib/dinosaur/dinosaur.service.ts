import { Injectable } from "@angular/core";
import { IDinosaur } from "@avans-nx-workshop/shared/api";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import {throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMeal } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';

// /**
//  * See https://angular.io/guide/http#requesting-data-from-a-server
//  */
// export const httpOptions = {
//     observe: 'body',
//     responseType: 'json',
// };

// /**
//  *
//  *
//  */
// @Injectable()
// export class DinosaurService {
//     endpoint = 'http://localhost:3000/api/dinosaur';

//     constructor(private readonly http: HttpClient) {}

//     /**
//      * Get all items.
//      *
//      * @options options - optional URL queryparam options
//      */
//     public list(options?: any): Observable<IDinosaur[] | null> {
//         console.log(`list ${this.endpoint}`);

//         return this.http
//             .get<ApiResponse<IDinosaur[]>>(this.endpoint, {
//                 ...options,
//                 ...httpOptions,
//             })
//             .pipe(
//                 map((response: any) => response.results as IDinosaur[]),
//                 tap(console.log),
//                 catchError(this.handleError)
//             );
//     }

//     /**
//      * Get a single item from the service.
//      *
//      */
//     public read(id: string | null, options?: any): Observable<IDinosaur> {
//         console.log(`read ${this.endpoint}`);
//         return this.http
//             .get<ApiResponse<IDinosaur>>(this.endpoint, {
//                 ...options,
//                 ...httpOptions,
//             })
//             .pipe(
//                 tap(console.log),
//                 map((response: any) => response.results as IDinosaur),
//                 catchError(this.handleError)
//             );
//     }

//     /**
//      * Handle errors.
//      */
//     public handleError(error: HttpErrorResponse): Observable<any> {
//         console.log('handleError in DinosaurService', error);

//         return throwError(() => new Error(error.message));
//     }

// }


@Injectable()
export class DinosaurService {

  private dinosaurs$ = new BehaviorSubject<IDinosaur[]>([
    {
      id: '1',
      dinoname: 'Dino Doe',
      species: 'T-rex',
      dateOfBirth: new Date('1995-03-10'),
      weight: 55.5,
      height: 183,
      dietType: 'carnivore'
    },
    {
      id: '2',
      dinoname: 'Raptor Red',
      species: 'Velociraptor',
      dateOfBirth: new Date('1998-07-22'),
      weight: 30.2,
      height: 150,
      dietType: 'carnivore'
    },
    {
      id: '3',
      dinoname: 'Stego Spike',
      species: 'Stegosaurus',
      dateOfBirth: new Date('1990-05-15'),
      weight: 72.8,
      height: 210,
      dietType: 'herbivore'
    },
    {
      id: '4',
      dinoname: 'Triceratops Thunder',
      species: 'Triceratops',
      dateOfBirth: new Date('1993-11-28'),
      weight: 65.0,
      height: 160,
      dietType: 'herbivore'
    },
    {
      id: '5',
      dinoname: 'Ptero Soar',
      species: 'Pteranodon',
      dateOfBirth: new Date('1996-04-05'),
      weight: 20.5,
height: 183,
      dietType: 'piscivore'
    }
    ]);

  public list(options?: any): Observable<IDinosaur[] | null> {
    return this.dinosaurs$.asObservable();
  }

  public read(id: string | null, options?: any): Observable<IDinosaur> {
    return this.dinosaurs$.asObservable().pipe(
      map(dinosaurs => {
        const foundDinosaur = dinosaurs.find(dinosaur => dinosaur.id === id);
        if (!foundDinosaur) {
          throw new Error('Dinosaur not found');
        }
        return foundDinosaur;
      })
    );
  }
  public create(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
    this.dinosaurs$.next([ ...this.dinosaurs$.value, dinosaur ]);
    return of(dinosaur);
  }

  public update(dinosaur: IDinosaur, options?: any): Observable<IDinosaur> {
    this.dinosaurs$.next(
      this.dinosaurs$.value.map(u => u.id === dinosaur.id ? dinosaur : u)
    );
    return of(dinosaur);
  }

 public deleteDinosaur(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.dinosaurs$.getValue();
    const index = current.findIndex(u => u.id === id);
    if (index < 0) {
      //throw new NotFoundException(`Dinosaur with id ${id} not found`);
    }
    current.splice(index, 1);
    this.dinosaurs$.next(current);
  }



}