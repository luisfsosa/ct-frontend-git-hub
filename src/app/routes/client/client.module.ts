import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { ContextMenuModule } from "ngx-contextmenu";
import { MyDatePickerModule } from "mydatepicker";

import { InstitutionalClientComponent } from './institutional-client/institutional-client/institutional-client.component';
import { InstitutionalClientFormComponent } from './institutional-client/institutional-client-form/institutional-client-form.component';
import { InstitutionalClientEditFormComponent } from './institutional-client/institutional-client-form/institutional-client-edit-form.component';
import { BeneficiaryClientComponent } from './beneficiary-client/beneficiary-client/beneficiary-client.component';
import { BeneficiaryClientFormComponent } from './beneficiary-client/beneficiary-client-form/beneficiary-client-form.component';
import { BeneficiaryClientEditFormComponent } from './beneficiary-client/beneficiary-client-form/beneficiary-client-edit-form.component';


const routes: Routes = [
    { path: 'institutional-client', component: InstitutionalClientComponent },
    { path: 'beneficiary-client', component: BeneficiaryClientComponent },
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
    InstitutionalClientComponent,
    InstitutionalClientFormComponent,
    InstitutionalClientEditFormComponent,
    BeneficiaryClientComponent,
    BeneficiaryClientFormComponent,
    BeneficiaryClientEditFormComponent
  ],
  entryComponents: [
    InstitutionalClientComponent,
    InstitutionalClientFormComponent,
    InstitutionalClientEditFormComponent,
    BeneficiaryClientComponent,
    BeneficiaryClientFormComponent,
    BeneficiaryClientEditFormComponent
  ],
  providers: []
})
export class ClientModule {}
