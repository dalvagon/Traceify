import { RequestComponent } from './page/request/request.component';
import { DappRoutingModule } from './dapp-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LandingComponent } from './page/landing/landing.component';
import { ModelComponent } from './page/landing/model/model.component';
import { ProductComponent } from './page/product/product.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingComponent, ModelComponent, ProductComponent, RequestComponent],
  imports: [CommonModule, DappRoutingModule, ButtonModule, InputTextModule, InputTextareaModule, FormsModule, ReactiveFormsModule],
})
export class DappModule { }
