import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteRenduRoutingModule } from './compte-rendu-routing.module';
import { CompteRenduComponent } from './compte-rendu/compte-rendu.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompteRenduComponent
  ],
  imports: [
    CommonModule,
    CompteRenduRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompteRenduModule { }
