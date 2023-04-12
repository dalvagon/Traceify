import { AdminComponent } from './page/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { AddManagerComponent } from './page/add-manager/add-manager.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'add-manager',
        component: AddManagerComponent,
        canActivate: [AdminGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
