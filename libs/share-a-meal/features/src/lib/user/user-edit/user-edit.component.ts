import {Component, OnInit} from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { UserService } from '../../user/user.service';

@Component({
  selector: 'share-a-meal-user-edit',
  templateUrl: './user-edit.component.html',
  styles: [],
})
export class UserEditComponent implements OnInit {
  user: IUser | undefined;
  editForm: FormGroup;
  isNewUser = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.editForm = this.fb.group({
      'username': [''],
      'email': [''],
      'password': [''],
      'dateOfBirth' : [''],
'address' : [''],
'occupation': [''],
'isAdmin' : ['']
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isNewUser = true;
      return;
    }
    this.userService.read(id).subscribe((user: IUser) => {
      this.user = user;
      this.editForm.setValue({
        'username': user.username,
        'email': user.email,
        'password': user.password,
'dateOfBirth' : user.dateOfBirth,
'address' : user.address,
'occupation': user.occupation,
'isAdmin' : user.isAdmin


      });
    });
  }

  onSubmit() {
    if (this.isNewUser) {
      this.userService.create(this.editForm.value)
        .subscribe(user => this.router.navigate(['/user', user.id]));
    } else {
      const updatedUser: IUser = {
        ...this.user,
        ...this.editForm.value
      };

      console.log('Edited user data:', updatedUser);


      this.userService.update(updatedUser)
        .subscribe(() =>
         
        this.router.navigate(['/user', updatedUser.id]));
    }
  }
}

