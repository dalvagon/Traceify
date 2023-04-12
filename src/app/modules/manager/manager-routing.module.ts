import { ManagerComponent } from './page/manager/manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from '../manager/page/create-product/create-product.component';

const routes: Routes = [
    {
        path: '',
        component: ManagerComponent
    },
    {
        path: 'create-product',
        component: CreateProductComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagerRoutingModule { }
