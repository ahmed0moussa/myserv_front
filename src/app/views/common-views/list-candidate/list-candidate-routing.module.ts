import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';

const routes: Routes = [
  {path:'',component:ListCandidateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCandidateRoutingModule { }
