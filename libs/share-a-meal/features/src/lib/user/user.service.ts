import { Injectable } from "@angular/core";
import { IUser } from "@avans-nx-workshop/shared/api";
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
export class UserService {
  endpoint = 'http://localhost:3000/api/user';

constructor(private readonly http:HttpClient) {

}

  private users$ = new BehaviorSubject<IUser[]>([
    {
      _id: '1',
      username: 'John Doe',
      email: 'johndoe@avans.nl',
      password: '1234',
      dateOfBirth: new Date('1990-01-01'),
      address: '123 Main Street',
      occupation: 'Software Developer',
      isAdmin: false,
    },
    {
      _id: '2',
      username: 'Alice Smith',
      email: 'alicesmith@example.com',
      password: '5678',
      dateOfBirth: new Date('1985-05-15'),
      address: '456 Oak Avenue',
      occupation: 'Data Analyst',
      isAdmin: false,
    },
    {
      _id: '3',
      username: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      password: 'abcd',
      dateOfBirth: new Date('1982-08-22'),
      address: '789 Pine Lane',
      occupation: 'Marketing Manager',
      isAdmin: true,

    },
    {
      _id: '4',
      username: 'Eva Rodriguez',
      email: 'evarodriguez@example.com',
      password: 'efgh',
      dateOfBirth: new Date('1995-03-10'),
      address: '101 Cedar Street',
      occupation: 'Graphic Designer',
      isAdmin: false,
    },
    {
      _id: '5',
      username: 'Michael Chang',
      email: 'michaelchang@example.com',
      password: 'ijkl',
      dateOfBirth: new Date('1988-11-28'),
      address: '202 Elm Road',
      occupation: 'Product Manager',
      isAdmin: false,
    }
    ]);

    public list(options?: any): Observable<IUser[] | null> {
      // return this.dinosaurs$.asObservable();
      return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        ...httpOptions
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
      )
    }

    public read(id: string | null, options?: any): Observable<IUser> {
      return this.http
        .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IUser),
          catchError(error => {
            console.error('Error fetching user details:', error);
            throw error;
          })
        );
    }


    public create(user: IUser, options?: any): Observable<IUser> {
      return this.http
        .post<ApiResponse<IUser>>(this.endpoint, user, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IUser),
          catchError(error => {
            console.error('Error creating user:', error);
            throw error;
          })
        );
    }

    public update(user: IUser, options?: any): Observable<IUser> {
      return this.http
        .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user, {
          ...options,
          ...httpOptions
        })
        .pipe(
          map((response: any) => response.results as IUser),
          catchError(error => {
            console.error('Error updating user:', error);
            throw error;
          })
        );
    }

  public deleteUser(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.users$.getValue();
    const index = current.findIndex(u => u._id === id);
    if (index < 0) {
      //throw new NotFoundException(`User with id ${id} not found`);
    }
    current.splice(index, 1);
    this.users$.next(current);
  }
}



