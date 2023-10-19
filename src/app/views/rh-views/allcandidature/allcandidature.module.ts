import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AllcandidatureRoutingModule } from './allcandidature-routing.module';
import { AllcandidatureComponent } from './allcandidature/allcandidature.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AllcandidatureComponent
  ],
  imports: [
    CommonModule,
    AllcandidatureRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    
  ]
})
export class AllcandidatureModule { }
