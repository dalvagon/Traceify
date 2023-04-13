import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './page/admin/admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
