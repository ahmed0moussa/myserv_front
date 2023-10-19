import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadlistComponent } from './loadlist/loadlist.component';

const routes: Routes = [
  {path:'',component:LoadlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadlistRoutingModule { }
