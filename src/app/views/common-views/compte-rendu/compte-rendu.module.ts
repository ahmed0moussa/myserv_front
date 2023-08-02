import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteRenduRoutingModule } from './compte-rendu-routing.module';
import { CompteRenduComponent } from './compte-rendu/compte-rendu.component';


@NgModule({
  declarations: [
    CompteRenduComponent
  ],
  imports: [
    CommonModule,
    CompteRenduRoutingModule
  ]
})
export class CompteRenduModule { }
