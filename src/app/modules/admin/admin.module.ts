import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './page/admin/admin.component';
import { ButtonModule } from 'primeng/button';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ButtonModule,
    NgxSpinnerModule
  ]
})
export class AdminModule { }
