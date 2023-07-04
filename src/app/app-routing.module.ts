import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RhLayoutComponent } from './layouts/rh-layout/rh-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {path:'rh',component:RhLayoutComponent,
  children:[
    {path:'',loadChildren:()=>import('./views/rh-views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'addcandidate',loadChildren:()=>import('./views/rh-views/add-candidate/add-candidate.module').then(m=>m.AddCandidateModule)},
    {path:'listcandidate',loadChildren:()=>import('./views/common-views/list-candidate/list-candidate.module').then(m=>m.ListCandidateModule)}
  ]
},
  {path:'admin',component:AdminLayoutComponent,
  children:[
    {path:'',loadChildren:()=>import('./views/admin-views/dashboard/dashboard.module').then(m=>m.DashboardModule)},
    {path:'adduserrh',loadChildren:()=>import('./views/admin-views/add-user-rh/add-user-rh.module').then(m=>m.AddUserRHModule)},
    {path:'listuserrh',loadChildren:()=>import('./views/admin-views/list-user-rh/list-user-rh.module').then(m=>m.ListUserRHModule)},
    {path:'listcandidate',loadChildren:()=>import('./views/common-views/list-candidate/list-candidate.module').then(m=>m.ListCandidateModule)}
  ]
  } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
