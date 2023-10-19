import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllcandidatureComponent } from './allcandidature/allcandidature.component';

const routes: Routes = [
  {path:'',component:AllcandidatureComponent}]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllcandidatureRoutingModule { }
