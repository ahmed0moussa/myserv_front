import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUserRHRoutingModule } from './list-user-rh-routing.module';
import { ListUserRhComponent } from './list-user-rh/list-user-rh.component';


@NgModule({
  declarations: [
    ListUserRhComponent
  ],
  imports: [
    CommonModule,
    ListUserRHRoutingModule
  ]
})
export class ListUserRHModule { }
