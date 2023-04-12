import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddManagerComponent } from './page/add-manager/add-manager.component';
import { AdminComponent } from './page/admin/admin.component';

@NgModule({
  declarations: [AddManagerComponent, AdminComponent],
  imports: [
    AdminRoutingModule,
    CommonModule
  ]
})
export class AdminModule { }
