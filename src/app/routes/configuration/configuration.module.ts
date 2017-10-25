import { AddFormComponent } from './add-form/add-form.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";

import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { ContextMenuModule } from "ngx-contextmenu";
import { MyDatePickerModule } from "mydatepicker";

import { ConfigurationComponent } from "./configuration/configuration.component";
import { CreateComponent } from './create/create.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
    { path: 'info', component: ConfigurationComponent },
    { path: 'create', component: CreateComponent },
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
    ConfigurationComponent,
    AddFormComponent,
    CreateComponent,
    UserFormComponent,
  ],
  entryComponents: [
    UserFormComponent,
  ],
  providers: []
})
export class ConfigurationModule {}
