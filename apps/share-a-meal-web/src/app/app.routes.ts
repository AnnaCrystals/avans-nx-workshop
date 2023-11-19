import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from 'libs/share-a-meal/features/src/lib/user/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from 'libs/share-a-meal/features/src/lib/user/user.service';
import { UserDetailComponent } from 'libs/share-a-meal/features/src/lib/user/user-detail/user-detail.component';
import { UserEditComponent } from 'libs/share-a-meal/features/src/lib/user/user-edit/user-edit.component';


import { FormsModule } from '@angular/forms';

export const appRoutes: Routes = [
  {
    path: 'new',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
  {
    path: '', 
    pathMatch: 'full',
    component: UserListComponent,
  },
];



@NgModule({
  imports: [RouterModule.forChild(appRoutes), CommonModule, HttpClientModule, FormsModule],
  //declarations: [UserListComponent, UserDetailComponent, UserEditComponent],
  providers: [UserService],
  exports: [RouterModule],
})
export class UserModule {}

