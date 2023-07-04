import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCandidateRoutingModule } from './list-candidate-routing.module';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';


@NgModule({
  declarations: [
    ListCandidateComponent
  ],
  imports: [
    CommonModule,
    ListCandidateRoutingModule
  ]
})
export class ListCandidateModule { }
