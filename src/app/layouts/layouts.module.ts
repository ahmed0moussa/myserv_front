import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RhLayoutComponent } from './rh-layout/rh-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    RhLayoutComponent
  ],
  imports: [
    CommonModule,RouterModule
  ]
})
export class LayoutsModule { }
