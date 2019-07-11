// Author Shambhu :-14/06/2019
// Routings
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FrontpageComponent

  },
  {
    path: 'frontpage',
    component: FrontpageComponent
  },
  {
    path: 'second',
    component: SecondComponent
  },
{
  path: '**',
  redirectTo: 'frontpage'
}
];

@NgModule(
  {
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
