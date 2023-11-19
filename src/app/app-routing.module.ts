import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RhLayoutComponent } from './layouts/rh-layout/rh-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AddCandidateModule } from './views/rh-views/add-candidate/add-candidate.module';
import { ApplicationGuardService } from './services/guards/application-guard.service';
import { CandidatureLayoutComponent } from './layouts/candidature-layout/candidature-layout.component';
import { AuthResetRequestLayoutComponent } from './layouts/auth-reset-request-layout/auth-reset-request-layout.component';
import { RestpasswordLayoutComponent } from './layouts/restpassword-layout/restpassword-layout.component';


const routes: Routes = [
  {
    path: 'candidature',
    component: CandidatureLayoutComponent,
    
  },
  {
    path: 'login',
    component: AuthLayoutComponent,
  },
  {
    path: 'restpassword/:token',
    component: RestpasswordLayoutComponent,
  },
  {
    path: 'forgetpassword',
    component: AuthResetRequestLayoutComponent,
  },

  {
    path: '',
    component: RhLayoutComponent,
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/rh-views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'addcandidate',
        loadChildren: () =>
          import('./views/rh-views/add-candidate/add-candidate.module').then(
            (m) => m.AddCandidateModule
          ),
      },
      {
        path: 'listCandidature',
        loadChildren: () =>
          import('./views/rh-views/allcandidature/allcandidature.module').then(
            (m) => m.AllcandidatureModule
          ),
      },
      {
        path: 'listcandidate/:type/:idtype',
        loadChildren: () =>
          import(
            './views/common-views/list-candidate/list-candidate.module'
          ).then((m) => m.ListCandidateModule),
      },
      {
        path: 'loadlist/:type/:idtype',
        loadChildren: () =>
          import(
            './views/common-views/loadlist/loadlist.module'
          ).then((m) => m.LoadlistModule),
      },
      {
        path: 'compterendu/:idcandidate',
        loadChildren: () =>
          import(
            './views/common-views/compte-rendu/compte-rendu.module'
          ).then((m) => m.CompteRenduModule),
      },
      {
        path: 'ajoutentretien/:idcandidate',
        loadChildren: () =>
          import(
            './views/common-views/addentretien/addentretien.module'
          ).then((m) => m.AddentretienModule),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./views/admin-views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'adduserrh',
        loadChildren: () =>
          import('./views/admin-views/add-user-rh/add-user-rh.module').then(
            (m) => m.AddUserRHModule
          ),
      },
      {
        path: 'listuserrh',
        loadChildren: () =>
          import('./views/admin-views/list-user-rh/list-user-rh.module').then(
            (m) => m.ListUserRHModule
          ),
      },
      {
        path: 'ajoutquestionrh',
        loadChildren: () =>
          import(
            './views/admin-views/add-question-rh/add-question-rh.module'
          ).then((m) => m.AddQuestionRhModule),
      },
      {
        path: 'ajoutspecialite',
        loadChildren: () =>
          import(
            './views/admin-views/add-specialite/add-specialite.module'
          ).then((m) => m.AddSpecialiteModule),
      },
      {
        path: 'listcandidate/:type/:idtype',
        loadChildren: () =>
          import(
            './views/common-views/list-candidate/list-candidate.module'
          ).then((m) => m.ListCandidateModule),
      },
      {
        path: 'loadlist/:type/:idtype',
        loadChildren: () =>
          import(
            './views/common-views/loadlist/loadlist.module'
          ).then((m) => m.LoadlistModule),
      },
      {
        path: 'compterendu/:idcandidate',
        loadChildren: () =>
          import(
            './views/common-views/compte-rendu/compte-rendu.module'
          ).then((m) => m.CompteRenduModule),
      },
     
      {
        path: 'ajoutentretien/:idcandidate',
        loadChildren: () =>
          import(
            './views/common-views/addentretien/addentretien.module'
          ).then((m) => m.AddentretienModule),
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
