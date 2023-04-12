import { DappRoutingModule } from './dapp-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LandingComponent } from './page/landing/landing.component';
import { ModelComponent } from './page/landing/model/model.component';
import { ProductComponent } from './page/product/product.component';

@NgModule({
  declarations: [LandingComponent, ModelComponent, ProductComponent],
  imports: [CommonModule, DappRoutingModule, ButtonModule],
})
export class DappModule { }
