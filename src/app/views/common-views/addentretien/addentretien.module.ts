import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddentretienRoutingModule } from './addentretien-routing.module';
import { AddentretienComponent } from './addentretien/addentretien.component';


@NgModule({
  declarations: [
    AddentretienComponent
  ],
  imports: [
    CommonModule,
    AddentretienRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddentretienModule { }
