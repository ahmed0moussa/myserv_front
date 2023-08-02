import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteRenduComponent } from './compte-rendu/compte-rendu.component';

const routes: Routes = [
  {path:'',component:CompteRenduComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRenduRoutingModule { }
