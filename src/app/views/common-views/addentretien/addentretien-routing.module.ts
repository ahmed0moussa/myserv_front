import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddentretienComponent } from './addentretien/addentretien.component';

const routes: Routes = [
  {path:'',component:AddentretienComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddentretienRoutingModule { }
