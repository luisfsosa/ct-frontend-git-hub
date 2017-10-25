import { FormState} from '../settings-global-form/settings-global-form.component';
import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { overlayConfigFactory } from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { WSClient } from '../../../core/api/client.service';
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { SettingsGlobalFormComponent } from "../settings-global-form/settings-global-form.component";
import { SettingsGlobalEditFormComponent } from "../settings-global-form/settings-global-edit-form.component";
import {SettingsDispatchingFormComponent} from "../settings-dispatching-form/settings-dispatching-form.component";
import {SettingsDispatchingEditFormComponent} from "../settings-dispatching-form/settings-dispatching-edit-form.component";
import {SettingsRfcEditFormComponent} from "../settings-rfc-form/settings-rfc-edit-form.component";
import {SettingsRfcFormComponent} from "../settings-rfc-form/settings-rfc-form.component";
import SettingsValidator from "../settings.validator"
import {GLOBAL, DISPATCHING, RFC}  from "../settings.constants";

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";

const swal = require("sweetalert");

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public dataGlobal:any = {content:[],columns:[]};
  public dataDispatching:any = {content:[],columns:[]};
  public dataRfc:any = {content:[],columns:[]};

  constructor(
    public modal: Modal,
    public _WS: WSClient,
    public _User: UserLogin,
    private pubsub: PubSubService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadGlobalSettingsList();
    this.loadDispatchingSettingsList();
    this.loadRfcSettingsList();

    this.pubsub.subscribe(HEADER_EVENTS.FILTERS, () => {
      this.loadGlobalSettingsList();
      this.loadDispatchingSettingsList();
      this.loadRfcSettingsList();
    });

    this.pubsub.subscribe(RECIEVED_EVENTS.RELOAD, ()=>{
      this.loadGlobalSettingsList();
      this.loadDispatchingSettingsList();
      this.loadRfcSettingsList();
    })
  }

  ngOnDestroy() {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }


  loadGlobalSettingsList(){
    const params: URLSearchParams = new URLSearchParams();

    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._WS.GlobalSettings()
      .get(requestOptions)
      .subscribe(data => {
        this.dataGlobal=data.json();
        this.dataGlobal.columns.splice(1, 4);
        }
      );
  }

  loadDispatchingSettingsList(){
    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();

    params.set("cliente_id", this._User.getClient().cliente_id);
    requestOptions.params = params;
    this._WS.DispatchingSettings()
      .get(requestOptions)
      .subscribe(data => {
        this.dataDispatching=data.json();
        this.dataDispatching.columns.splice(1, 4);
        }
      );
  }

  loadRfcSettingsList(){
    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();

    params.set("cliente_id", this._User.getClient().cliente_id);
    params.set("rfc", this._User.getClient().rfc);
    requestOptions.params = params;
    this._WS.RfcSettings()
      .get(requestOptions)
      .subscribe(data => {
        this.dataRfc=data.json();
        this.dataRfc.columns.splice(1, 4);
        }
      );
  }

  addGSetting() {
    this.modal.open(SettingsGlobalFormComponent,new FormState("EDIT"));
  }

  addDSetting() {
    this.modal.open(SettingsDispatchingFormComponent,new FormState("EDIT"));
  }

  addRSetting() {
    this.modal.open(SettingsRfcFormComponent,new FormState("EDIT"));
  }

  updateGlobal(item){
    this.modal.open(
      SettingsGlobalEditFormComponent,
      overlayConfigFactory({selected: item})
    );
  }

  updateDispaching(item) {
    this.modal.open(
      SettingsDispatchingEditFormComponent,
      overlayConfigFactory({selected: item})
    );
  }

  updateRfc(item) {
    this.modal.open(
      SettingsRfcEditFormComponent,
      overlayConfigFactory({selected: item})
    );
  }

  removeGlobal(item, list) {
    SettingsValidator.delete(GLOBAL,item, list,this._User.getClient(),this._WS, this.toastr );
  }

  removeDispaching(item, list) {
    SettingsValidator.delete(DISPATCHING,item, list,this._User.getClient(),this._WS, this.toastr );
  }

  removeRfc(item, list) {
    SettingsValidator.delete(RFC,item, list,this._User.getClient(),this._WS, this.toastr );
  }

  notItemsSelected(){
    return swal("No Seleccionaste Ningún Parámetro Global!", "Por favor seleciona uno.", "error");
  }
}
