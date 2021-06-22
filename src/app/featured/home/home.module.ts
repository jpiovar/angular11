import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IntroductionComponent } from './containers/introduction/introduction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    IntroductionComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
