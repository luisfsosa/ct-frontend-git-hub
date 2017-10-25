import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { ContextMenuModule } from "ngx-contextmenu";
import { MyDatePickerModule } from "mydatepicker";

import { CreditComponent } from './credit/credit/credit.component';
import { CreditFormComponent } from './credit/credit-form/credit-form.component';
import { CreditEditFormComponent } from './credit/credit-form/credit-edit-form.component';


const routes: Routes = [
    { path: 'credit', component: CreditComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ContextMenuModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    MyDatePickerModule
  ],
  exports: [RouterModule],
  declarations: [
    CreditComponent,
    CreditFormComponent,
    CreditEditFormComponent,
  ],
  entryComponents: [
    CreditComponent,
    CreditFormComponent,
    CreditEditFormComponent,
  ],
  providers: []
})
export class LoanModule {}
