import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule} from '../../shared/shared.module';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MyDatePickerModule } from 'mydatepicker';
import { SettingsGlobalFormComponent } from './settings-global-form/settings-global-form.component';
import { SettingsGlobalEditFormComponent } from './settings-global-form/settings-global-edit-form.component';
import {SettingsDispatchingFormComponent} from "./settings-dispatching-form/settings-dispatching-form.component";
import {SettingsDispatchingEditFormComponent} from "./settings-dispatching-form/settings-dispatching-edit-form.component";
import {SettingsRfcFormComponent} from "./settings-rfc-form/settings-rfc-form.component";
import {SettingsRfcEditFormComponent} from "./settings-rfc-form/settings-rfc-edit-form.component";

const routes: Routes = [
    { path: '', component: SettingsComponent }
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
      SettingsComponent,
      SettingsGlobalFormComponent,
      SettingsGlobalEditFormComponent,
      SettingsDispatchingFormComponent,
      SettingsDispatchingEditFormComponent,
      SettingsRfcFormComponent,
      SettingsRfcEditFormComponent],
    entryComponents: [
      SettingsGlobalFormComponent,
      SettingsGlobalEditFormComponent,
      SettingsDispatchingFormComponent,
      SettingsDispatchingEditFormComponent,
      SettingsRfcFormComponent,
      SettingsRfcEditFormComponent],
    providers: [],
})
export class SettingsModule {}
