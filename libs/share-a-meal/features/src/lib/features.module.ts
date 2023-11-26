import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { ReactiveFormsModule } from '@angular/forms';

import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { DinosaurListComponent } from './dinosaur/dinosaur-list/dinosaur-list.component';
import { DinosaurDetailComponent } from './dinosaur/dinosaur-detail/dinosaur-detail.component';
import { DinosaurEditComponent } from './dinosaur/dinosaur-edit/dinosaur-edit.component';
import { DinosaurService } from './dinosaur/dinosaur.service';

import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  //user
  {
    path: 'user/new',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'user/:id/edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
  {
    path: 'user',
    pathMatch: 'full',
    component: UserListComponent,
  },

  //dinosaur
  {
    path: 'dinosaur/new',
    pathMatch: 'full',
    component: DinosaurEditComponent,
  },
  {
    path: 'dinosaur/:id/edit',
    pathMatch: 'full',
    component: DinosaurEditComponent,
  },
  {
    path: 'dinosaur/:id',
    pathMatch: 'full',
    component: DinosaurDetailComponent,
  },
  {
    path: 'dinosaur',
    pathMatch: 'full',
    component: DinosaurListComponent,
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(appRoutes), ReactiveFormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    DinosaurListComponent,
    DinosaurDetailComponent,
    DinosaurEditComponent,
    AboutComponent,
    DashboardComponent,
  ],
  providers: [MealService, UserService, DinosaurService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    DinosaurListComponent,
    DinosaurDetailComponent,
    DinosaurEditComponent,
    AboutComponent,
    DashboardComponent
  ],
})
export class FeaturesModule {}
