import { NgxSpinnerModule } from 'ngx-spinner';
import { ManagerRoutingModule } from './manager-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './page/create-product/create-product.component';
import { ManagerComponent } from './page/manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { AddOperationComponent } from './page/add-operation/add-operation.component';
import { QRCodeModule } from 'angularx-qrcode';
import { StatsComponent } from './page/stats/stats.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { DividerModule } from 'primeng/divider';


@NgModule({
  declarations: [CreateProductComponent, ManagerComponent, AddOperationComponent, StatsComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    TooltipModule,
    CalendarModule,
    TableModule,
    DialogModule,
    QRCodeModule,
    NgxSpinnerModule,
    CanvasJSAngularChartsModule,
    NgxScannerQrcodeModule,
    DividerModule
  ]
})
export class ManagerModule { }
