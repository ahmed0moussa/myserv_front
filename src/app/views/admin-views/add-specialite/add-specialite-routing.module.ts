import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpecialiteComponent } from './add-specialite/add-specialite.component';

const routes: Routes = [
  {path:'',component:AddSpecialiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSpecialiteRoutingModule { }
