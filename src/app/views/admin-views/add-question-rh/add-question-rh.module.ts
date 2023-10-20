import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuestionRhRoutingModule } from './add-question-rh-routing.module';
import { AddQuestionRhComponent } from './add-question-rh/add-question-rh.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddQuestionRhComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddQuestionRhRoutingModule
  ]
})
export class AddQuestionRhModule { }
