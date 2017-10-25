import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    imports: [
        ChartsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DashboardComponent],
    exports: [
        RouterModule
    ]
})
export class DashboardModule { }
