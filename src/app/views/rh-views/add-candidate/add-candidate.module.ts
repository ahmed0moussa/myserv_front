import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCandidateRoutingModule } from './add-candidate-routing.module';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';


@NgModule({
  declarations: [
    AddCandidateComponent
  ],
  imports: [
    CommonModule,
    AddCandidateRoutingModule,
    FormsModule
  ]
})
export class AddCandidateModule { }
