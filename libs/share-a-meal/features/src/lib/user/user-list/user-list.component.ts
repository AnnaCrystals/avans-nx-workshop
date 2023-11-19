import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'; 

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
      this.subscription = this.userService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.users = results;
      });
  }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }

  // onUserClick(userId: number): void {
  //   console.log('User clicked!', userId);
  //   this.router.navigate(['/user', +userId]);
  // }


  onUserClick(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
  
  // onUserClick(userId: string): void {
  //   const numericUserId: number = +userId; // Parse the string to a number
  //   console.log('User clicked!', userId);
  //   this.router.navigate(['/user', numericUserId]);
  // }
  
}


