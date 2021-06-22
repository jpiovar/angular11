import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroductionComponent } from './containers/introduction/introduction.component';

const routes: Routes = [
  { path: 'introduction', component: IntroductionComponent, data: { page: 'introduction', label: 'Úvod'} },
  { path: '', component: IntroductionComponent, data: { page: 'introduction', label: 'Úvod'} },
  { path: '**', component: IntroductionComponent, data: { page: 'introduction', label: 'Úvod'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
