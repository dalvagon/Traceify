import { AddManagerComponent } from './page/add-manager/add-manager.component';
import { LandingComponent } from './page/landing/landing.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './page/create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'add-manager',
        component: AddManagerComponent,
      },
      {
        path: 'create-product',
        component: CreateProductComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappRoutingModule { }
