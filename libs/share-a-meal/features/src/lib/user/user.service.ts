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
      profilePicture: ''
    },
    {
      id: '2',
      username: 'Jane Doe',
      email: 'janedoe@avans.nl',
      password: '1234',
      profilePicture: ''
    },
    {
      id: '3',
      username: 'John Smith',
      email: 'johnsmith@avans.nl',
      password: '1234',
      profilePicture: ''
    },
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
}