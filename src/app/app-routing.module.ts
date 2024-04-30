import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Lazy loading del módulo de países
  { path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule), },

  // Redirect to home page when route does not exist
  { path: '**', redirectTo: 'countries'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
