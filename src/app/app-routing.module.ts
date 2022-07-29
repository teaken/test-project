import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(r => r.HomeModule)
  },
  {
    path: 'detailed',
    loadChildren: () => import('./pages/detailed/detailed.module').then(r => r.DetailedModule)
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
