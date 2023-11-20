import { RouterModule, Routes } from '@angular/router';



import { FormsModule } from '@angular/forms';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
    import ('@avans-nx-workshop/share-a-meal/features').then(
      (module) => module.FeaturesModule
    ),
  },

  {
    path: '**',
    redirectTo: '/about',
    pathMatch: 'full',
  },

];
