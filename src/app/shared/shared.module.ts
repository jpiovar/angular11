import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerButtonComponent } from './components/hamburger-button/hamburger-button.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DynamicContentComponent } from './components/dynamic-content/dynamic-content.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    HamburgerButtonComponent,
    DynamicContentComponent,
    SafeHtmlPipe,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HamburgerButtonComponent,
    DynamicContentComponent,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
