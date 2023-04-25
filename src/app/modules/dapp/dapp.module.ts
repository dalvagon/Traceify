import { RequestComponent } from './page/request/request.component';
import { DappRoutingModule } from './dapp-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LandingComponent } from './page/landing/landing.component';
import { ModelComponent } from './page/landing/model/model.component';
import { ProductComponent } from './page/product/product.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './page/products/products.component';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgxSpinnerModule } from "ngx-spinner";
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [LandingComponent, ModelComponent, ProductComponent, RequestComponent, ProductsComponent],
  imports: [CommonModule, DividerModule, DappRoutingModule, NgxSpinnerModule, QRCodeModule, NgxScannerQrcodeModule, ButtonModule, InputTextModule, InputTextareaModule, FormsModule, ReactiveFormsModule, TimelineModule, CardModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DappModule { }
