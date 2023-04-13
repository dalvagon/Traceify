import { ManagerRoutingModule } from './manager-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './page/create-product/create-product.component';
import { ManagerComponent } from './page/manager/manager.component';
import { RequestComponent } from '../dapp/page/request/request.component';

@NgModule({
  declarations: [CreateProductComponent, ManagerComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
  ]
})
export class ManagerModule { }
