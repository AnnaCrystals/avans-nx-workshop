import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<IUser | null> | undefined;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}



  ngOnInit(): void {
  this.user$ = this.route.params.pipe(
    switchMap((params) => {
      console.log('Route Params:', params); // Log the entire params object
      const userId = params['_id'];
      return this.userService.read(userId);
    })
  );
  this.user$.subscribe((data) => console.log('User Data:', data));
}



  onDeleteClick(): void {
    if (this.user$) {
      this.user$
        .pipe(
          filter((user): user is IUser => !!user),
          take(1)
        )
        .subscribe((user) => {
          if (user._id) {
            console.log(`Deleting user with ID: ${user._id}`);
  
            this.userService.deleteUser(user._id);
           
            console.log(`User with ID ${user._id} deleted successfully.`);
            
            this.router.navigate(['/user-list']);
          }
        });
    }
  }

}

