import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSpecialiteRoutingModule } from './add-specialite-routing.module';
import { AddSpecialiteComponent } from './add-specialite/add-specialite.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddSpecialiteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddSpecialiteRoutingModule
  ]
})
export class AddSpecialiteModule { }
