import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 
import { NgZone } from '@angular/core';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private userService: UserService, private router: Router) {} 

  ngOnInit(): void {
    console.log('Before subscribing to the observable');
    this.subscription = this.userService.list().subscribe((results) => {
        console.log('Inside the observable subscription');
        console.log('Users:', results);
        this.users = results;
    });
    console.log('After subscribing to the observable');
}

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  onUserClick(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
  
}


