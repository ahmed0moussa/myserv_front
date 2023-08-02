import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListCandidateRoutingModule } from './list-candidate-routing.module';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import {DataTablesModule} from 'angular-datatables'

@NgModule({
  declarations: [
    ListCandidateComponent
  ],
  imports: [
    CommonModule,
    ListCandidateRoutingModule,
    DataTablesModule,
    FormsModule
  ]
})
export class ListCandidateModule { }
