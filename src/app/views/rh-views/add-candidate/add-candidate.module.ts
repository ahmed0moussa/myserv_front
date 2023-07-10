import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCandidateRoutingModule } from './add-candidate-routing.module';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ReactiveFormsModule } from '@angular/forms';  


@NgModule({
  declarations: [
    AddCandidateComponent
  ],
  imports: [
    CommonModule,
    AddCandidateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddCandidateModule { }
