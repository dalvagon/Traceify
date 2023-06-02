import { AddOperationComponent } from './page/add-operation/add-operation.component';
import { ManagerComponent } from './page/manager/manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuard } from 'src/app/core/guard/manager.guard';
import { CreateProductComponent } from './page/create-product/create-product.component';
import { StatsComponent } from './page/stats/stats.component';

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
    component: AddOperationComponent,
    canActivate: [ManagerGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [ManagerGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
