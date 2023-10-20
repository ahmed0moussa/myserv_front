import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionRhComponent } from './add-question-rh/add-question-rh.component';

const routes: Routes = [
  {path:'',component:AddQuestionRhComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddQuestionRhRoutingModule { }
