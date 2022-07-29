import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedComponent } from './detailed.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from 'src/app/shared/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: DetailedComponent
  },
]

@NgModule({
  declarations: [
    DetailedComponent
  ],
  exports: [
    DetailedComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    LoaderModule
  ]
})
export class DetailedModule { }
