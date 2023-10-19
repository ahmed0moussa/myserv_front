import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadlistRoutingModule } from './loadlist-routing.module';
import { LoadlistComponent } from './loadlist/loadlist.component';


@NgModule({
  declarations: [
    LoadlistComponent
  ],
  imports: [
    CommonModule,
    LoadlistRoutingModule
  ]
})
export class LoadlistModule { }
