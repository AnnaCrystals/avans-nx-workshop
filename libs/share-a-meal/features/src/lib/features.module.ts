import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { MealService } from './meal/meal.service';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserService } from './user/user.service';
import { UserEditComponent } from './user/user-edit/user-edit.component';

const appRoutes: Routes = [
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
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(appRoutes)], // Include RouterModule here
  declarations: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
  ],
  providers: [MealService, UserService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
  ],
})
export class FeaturesModule {}


