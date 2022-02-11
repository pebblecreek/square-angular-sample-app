import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NarrowWindowComponent } from './narrow-window/narrow-window.component';

const routes: Routes = [
  {
    path: '',
    component: NarrowWindowComponent,
    children: [
      {
        path: 'vendor',
        loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
      },
      {
        path: '',
        redirectTo: '/vendor',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
