import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';

import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  // the Router watches url /heros, and display HeroesComponent
  { path: 'heroes', component: HeroesComponent} ,
  // too bad, TypeScript still could not catch typo "dahsboard",
  // there were exception on console - ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'dashboard'
  { path: 'dashboard', component: DashboardComponent} ,
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    // Note the initializing routes.
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
