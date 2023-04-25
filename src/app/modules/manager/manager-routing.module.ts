import { AddOperationComponent } from './page/add-operation/add-operation.component';
import { ManagerComponent } from './page/manager/manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuard } from 'src/app/core/guard/manager.guard';
import { CreateProductComponent } from './page/create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'add-operation/:uid',
    component: AddOperationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
