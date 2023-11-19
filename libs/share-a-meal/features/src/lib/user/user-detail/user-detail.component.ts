import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'avans-nx-workshop-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user$: Observable<IUser | null> | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute) {}


  ngOnInit(): void {
  this.user$ = this.route.params.pipe(
    switchMap((params) => {
      console.log('Route Params:', params); // Log the entire params object
      const userId = params['id'];
      return this.userService.read(userId);
    })
  );
}

}

