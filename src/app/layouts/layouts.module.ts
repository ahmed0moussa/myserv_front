import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { RhLayoutComponent } from './rh-layout/rh-layout.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatureLayoutComponent } from './candidature-layout/candidature-layout.component';

@NgModule({
  declarations: [AdminLayoutComponent, RhLayoutComponent, AuthLayoutComponent, CandidatureLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LayoutsModule {}
