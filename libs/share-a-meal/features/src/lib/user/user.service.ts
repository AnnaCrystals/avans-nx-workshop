// import { Injectable } from "@angular/core";
// import { IUser } from "@avans-nx-workshop/shared/api";
// import { BehaviorSubject, Observable, map, of } from "rxjs";
// import {throwError } from 'rxjs';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, tap } from 'rxjs/operators';
// import { ApiResponse, IMeal } from '@avans-nx-workshop/shared/api';

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
// export class UserService {
//     endpoint = 'http://localhost:3000/api/user';

//     constructor(private readonly http: HttpClient) {}

//     /**
//      * Get all items.
//      *
//      * @options options - optional URL queryparam options
//      */

//     public list(options?: any): Observable<IUser[] | null> {
        
//         console.log(`list ${this.endpoint}`);

//         return this.http
//             .get<ApiResponse<IUser[]>>(this.endpoint, {
//                 ...options,
//                 ...httpOptions,
//             })
//             .pipe(
//                 tap((response: any) => console.log('Response from server:', response)),
//                 map((response: any) => response.results as IUser[]),
//                 tap(console.log),
//                 catchError(this.handleError)
//             );
//     }

//     /**
//      * Get a single item from the service.
//      *
//      */
//     public read(id: string | null, options?: any): Observable<IUser> {
//         console.log(`read ${this.endpoint}`);
//         return this.http
//             .get<ApiResponse<IUser>>(this.endpoint, {
//                 ...options,
//                 ...httpOptions,
//             })
//             .pipe(
//                 tap(console.log),
//                 map((response: any) => response.results as IUser),
//                 catchError(this.handleError)
//             );
//     }

//     /**
//      * Handle errors.
//      */
//     public handleError(error: HttpErrorResponse): Observable<any> {
//         console.log('handleError in UserService', error);

//         return throwError(() => new Error(error.message));
//     }

// }




import { Injectable } from "@angular/core";
import { IUser } from "@avans-nx-workshop/shared/api";
import { BehaviorSubject, Observable, map, of } from "rxjs";



@Injectable()
export class UserService {

  private users$ = new BehaviorSubject<IUser[]>([
    {
      id: '1',
      username: 'John Doe',
      email: 'johndoe@avans.nl',
      password: '1234',
      dateOfBirth: new Date('1990-01-01'),
      address: '123 Main Street',
      occupation: 'Software Developer',
      isAdmin: false,
    },
    {
      id: '2',
      username: 'Alice Smith',
      email: 'alicesmith@example.com',
      password: '5678',
      dateOfBirth: new Date('1985-05-15'),
      address: '456 Oak Avenue',
      occupation: 'Data Analyst',
      isAdmin: false,
    },
    {
      id: '3',
      username: 'Bob Johnson',
      email: 'bobjohnson@example.com',
      password: 'abcd',
      dateOfBirth: new Date('1982-08-22'),
      address: '789 Pine Lane',
      occupation: 'Marketing Manager',
      isAdmin: true,

    },
    {
      id: '4',
      username: 'Eva Rodriguez',
      email: 'evarodriguez@example.com',
      password: 'efgh',
      dateOfBirth: new Date('1995-03-10'),
      address: '101 Cedar Street',
      occupation: 'Graphic Designer',
      isAdmin: false,
    },
    {
      id: '5',
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
    return this.users$.asObservable();
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    return this.users$.asObservable().pipe(
      map(users => {
        const foundUser = users.find(user => user.id === id);
        if (!foundUser) {
          throw new Error('User not found');
        }
        return foundUser;
      })
    );
  }
  public create(user: IUser, options?: any): Observable<IUser> {
    this.users$.next([ ...this.users$.value, user ]);
    return of(user);
  }

  public update(user: IUser, options?: any): Observable<IUser> {
    this.users$.next(
      this.users$.value.map(u => u.id === user.id ? user : u)
    );
    return of(user);
  }

  public deleteUser(id: string): void {
    //Logger.log(`[${this.TAG}] delete(${id})`);
    const current = this.users$.getValue();
    const index = current.findIndex(u => u.id === id);
    if (index < 0) {
      //throw new NotFoundException(`User with id ${id} not found`);
    }
    current.splice(index, 1);
    this.users$.next(current);
  }
}

