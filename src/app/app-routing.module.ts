import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppResultComponent } from './appresult.component'

const routes: Routes = [
  { path: 'result', component: AppResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
