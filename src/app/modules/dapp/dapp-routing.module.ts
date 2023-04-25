import { ProductComponent } from './page/product/product.component';
import { LandingComponent } from './page/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './page/request/request.component';
import { UserGuard } from 'src/app/core/guard/user.guard';
import { ProductsComponent } from './page/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'product/:uid',
    component: ProductComponent
  },
  {
    path: 'request',
    component: RequestComponent,
    canActivate: [UserGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DappRoutingModule { }
