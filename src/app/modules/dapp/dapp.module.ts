import { DappRoutingModule } from './dapp-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LandingComponent } from './page/landing/landing.component';
import { ModelComponent } from './page/model/model.component';
import { AddManagerComponent } from './page/add-manager/add-manager.component';
import { CreateProductComponent } from './page/create-product/create-product.component';

@NgModule({
  declarations: [LandingComponent, ModelComponent, AddManagerComponent, CreateProductComponent],
  imports: [CommonModule, DappRoutingModule, ButtonModule],
})
export class DappModule { }
