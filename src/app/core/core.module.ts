import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ToastrComponent } from './components/toastr/toastr.component';

import { MaterialModule } from '../material.module';

import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SpinnerComponent,
    ToastrComponent,
    SidenavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    SpinnerComponent,
    ToastrComponent,
    SidenavMenuComponent
  ]
})
export class CoreModule { }
