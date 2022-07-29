import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from 'src/app/shared/loader/loader.module';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoaderModule
  ]
})
export class HomeModule { }
