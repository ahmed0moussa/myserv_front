import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCandidateRoutingModule } from './add-candidate-routing.module';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';


@NgModule({
  declarations: [
    AddCandidateComponent
  ],
  imports: [
    CommonModule,
    AddCandidateRoutingModule
  ]
})
export class AddCandidateModule { }
