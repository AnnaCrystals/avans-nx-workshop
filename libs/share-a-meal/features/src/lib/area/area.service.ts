import { Injectable } from "@angular/core";
import { IArea } from "@avans-nx-workshop/shared/api";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import {throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse, IMeal } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';

@Injectable()
export class AreaService {

  private areas$ = new BehaviorSubject<IArea[]>([
    {
      id: '1',
      nameCompound: 'T-rex paddock',
      code: 'TREX-17',
      sizeSquareMeter: 2000,
      site: 'B',
      vegetation: 'jungle',
      securityOn: true,
    },
    {
        id: '2',
        nameCompound: 'Velociraptor Enclosure',
        code: 'VELO-22',
        sizeSquareMeter: 1800,
        site: 'C',
        vegetation: 'dense forest',
        securityOn: true,
    },
    {
        id: '3',
        nameCompound: 'Triceratops Habitat',
        code: 'TRIC-10',
        sizeSquareMeter: 2500,
        site: 'A',
        vegetation: 'grassy plains',
        securityOn: true,
    },
    {
        id: '4',
        nameCompound: 'Stegosaurus Zone',
        code: 'STEG-14',
        sizeSquareMeter: 1800,
        site: 'D',
        vegetation: 'wooded area',
        securityOn: true,
    },
    {
        id: '5',
        nameCompound: 'Pterodactyl Aviary',
        code: 'PTER-08',
        sizeSquareMeter: 1500,
        site: 'E',
        vegetation: 'cliffs and caves',
        securityOn: true,
    }
    ]);

  public list(options?: any): Observable<IArea[] | null> {
    return this.areas$.asObservable();
  }

  public read(id: string | null, options?: any): Observable<IArea> {
    return this.areas$.asObservable().pipe(
      map(areas => {
        const foundArea = areas.find(area => area.id === id);
        if (!foundArea) {
          throw new Error('Area not found');
        }
        return foundArea;
      })
    );
  }
  public create(area: IArea, options?: any): Observable<IArea> {
    this.areas$.next([ ...this.areas$.value, area ]);
    return of(area);
  }

  public update(area: IArea, options?: any): Observable<IArea> {
    this.areas$.next(
      this.areas$.value.map(u => u.id === area.id ? area : u)
    );
    return of(area);
  }

 public deleteArea(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.areas$.getValue();
    const index = current.findIndex(u => u.id === id);
    if (index < 0) {
      //throw new NotFoundException(`Area with id ${id} not found`);
    }
    current.splice(index, 1);
    this.areas$.next(current);
  }



}