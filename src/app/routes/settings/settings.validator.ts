import { FormState} from './settings-global-form/settings-global-form.component';
import { DialogRef} from "angular2-modal";
import { Router } from "@angular/router";
import { WSClient } from "../../core/api/client.service";
import { PubSubService } from "../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Client } from '../../core/api/user.service';
import {GLOBAL, DISPATCHING, RFC, CREATE, UPDATE, DELETE}  from "./settings.constants";

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../shared/ngx-pubsub/pubsub-actions";

const swal = require("sweetalert");

export default class SettingsValidator {

  static  scope: string;
  static fData:any;
  static _currentClient: Client;
  static dialog: DialogRef<FormState>;
  static _WS: WSClient;
  static pubsub: PubSubService;
  static toastr: ToastrService;
  static item: any;
  static list: any;
  static event: string;

  static create(
    scope: string,
    fData:any,
    _currentClient: Client,
    dialog: DialogRef<FormState>,
    _WS: WSClient,
    pubsub: PubSubService,
    toastr: ToastrService) {

    this.scope=scope;
    this.fData=fData;
    this._currentClient=_currentClient;
    this.dialog=dialog;
    this._WS=_WS;
    this.pubsub=pubsub;
    this.toastr=toastr;
    this.event=CREATE;

    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();

    switch (this.scope){
      case GLOBAL:
        params.set("alcance",this.scope);
        params.set("parametro",this.fData.codigo_parametro);
        break;

      case DISPATCHING:
        params.set("alcance",this.scope);
        params.set("parametro",this.fData.codigo_parametro);
        params.set("cliente_id", this._currentClient.cliente_id);
        break;

      case RFC:
        params.set("alcance",this.scope);
        params.set("parametro",this.fData.codigo_parametro);
        params.set("cliente_id", this._currentClient.cliente_id);
        params.set("rfc", this._currentClient.rfc);
        break;
    }

    requestOptions.params = params;
    _WS.SettingsValidator()
      .get(requestOptions)
      .subscribe((res) => this.validate(res));
  }

  static update(
    scope: string,
    fData:any,
    _currentClient: Client,
    dialog: DialogRef<FormState>,
    _WS: WSClient,
    pubsub: PubSubService,
    toastr: ToastrService) {

    let  context: any;
    this.scope=scope;
    this.fData=fData;
    this._currentClient=_currentClient;
    this.dialog=dialog;
    this._WS=_WS;
    this.pubsub=pubsub;
    this.toastr=toastr;
    this.event=UPDATE;

    context = this.dialog.context;


    if(this.fData.permite_sobreescritura_questionable==true){
      this.fData.permite_sobreescritura=1
    }

    if(context.selected[7]===this.fData.permite_sobreescritura){
      this.doUpdate();
      return;
    }

    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();

    switch (this.scope){
      case GLOBAL:
        params.set("alcance",this.scope);
        params.set("parametro",this.fData.codigo_parametro);
        params.set("event",this.event);
        break;

      case DISPATCHING:
        params.set("alcance",this.scope);
        params.set("parametro",this.fData.codigo_parametro);
        params.set("cliente_id", this._currentClient.cliente_id);
        params.set("event",this.event);
        break;

      case RFC:
        this.doUpdate();
        return;
    }

    requestOptions.params = params;
    _WS.SettingsValidator()
      .get(requestOptions)
      .subscribe((res) => this.validate(res));
  }

  static delete(
    scope: string,
    item:any,
    list:any,
    _currentClient: Client,
    _WS: WSClient,
    toastr: ToastrService) {

    this.scope=scope;
    this.item=item;
    this.list=list;
    this._currentClient=_currentClient;
    this._WS=_WS;
    this.toastr=toastr;
    this.event=DELETE;

    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();

    switch (this.scope){
      case GLOBAL:
        params.set("alcance",this.scope);
        params.set("parametro", this.item[5]);
        params.set("event",this.event);
        break;

      case DISPATCHING:
        params.set("alcance",this.scope);
        params.set("parametro",this.item[5]);
        params.set("cliente_id", this._currentClient.cliente_id);
        params.set("event",this.event);
        break;

      case RFC:
        this.doDelete();
        return;
    }
    requestOptions.params = params;
    _WS.SettingsValidator()
      .get(requestOptions)
      .subscribe((res) => this.validate(res));
  }

  private static validate(result){

    let resultInfo=result.json();
    if(resultInfo.result==="TRUE"){
      switch (this.event) {
        case CREATE:
          this.doCreate();
          break;

        case UPDATE:
          this.doUpdate();
          break;

        case DELETE:
          this.doDelete();
          break;
      }
    }
    else{
      this.showError(resultInfo);
    }
  }

  private static doCreate(){
    let globalEntity = {
      entity: "parametros",
      values: {
        alcance: GLOBAL,
        codigo_parametro: this.fData.codigo_parametro,
        permite_sobreescritura:0,
        tipo_parametro: this.fData.tipo_parametro,
        valor: ""
      }
    };

    let dispatchingEntity = {
      entity: "parametros",
      values: {
        alcance: DISPATCHING,
        cliente_id: this._currentClient.cliente_id,
        codigo_parametro: this.fData.codigo_parametro,
        permite_sobreescritura:this.fData.permite_sobreescritura,
        tipo_parametro: this.fData.tipo_parametro,
        valor: ""
      }
    };

    let rfcEntity = {
      entity: "parametros",
      values: {
        alcance: RFC,
        cliente_id: this._currentClient.cliente_id,
        rfc :this._currentClient.rfc,
        codigo_parametro: this.fData.codigo_parametro,
        permite_sobreescritura:this.fData.permite_sobreescritura,
        tipo_parametro: this.fData.tipo_parametro,
        valor: ""
      }
    };

    if(this.fData.permite_sobreescritura_questionable==true){
      globalEntity.values.permite_sobreescritura=1;
      dispatchingEntity.values.permite_sobreescritura=1;
      rfcEntity.values.permite_sobreescritura=1;
    }

    if(this.fData.tipo_parametro==="CUENTA_CONTABLE"){
      globalEntity.values.valor=this.fData.valor_cuenta_contable[0].id;
      dispatchingEntity.values.valor=this.fData.valor_cuenta_contable[0].id;
      rfcEntity.values.valor=this.fData.valor_cuenta_contable[0].id;
    }
    else{
      globalEntity.values.valor=this.fData.valor_valor;
      dispatchingEntity.values.valor=this.fData.valor_valor;
      rfcEntity.values.valor=this.fData.valor_valor;
    }


    switch (this.scope){
      case GLOBAL:
        console.log("save this Global", JSON.stringify(globalEntity));
        this._WS.Generic().post(JSON.stringify(globalEntity)).subscribe((res) => this.onSave(res, CREATE));
        break;

      case DISPATCHING:
        console.log("save this Dispatching", JSON.stringify(dispatchingEntity));
        this._WS.Generic().post(JSON.stringify(dispatchingEntity)).subscribe((res) => this.onSave(res,CREATE));
        break;

      case RFC:
        console.log("save this Dispatching", JSON.stringify(rfcEntity));
        this._WS.Generic().post(JSON.stringify(rfcEntity)).subscribe((res) => this.onSave(res,CREATE));
        break;
    }
  }

  private static doUpdate(){

    let entity = {
      entity: "parametros",
      id: this.fData.id,
      values: {
        permite_sobreescritura:this.fData.permite_sobreescritura,
        valor: ""
      }
    };

    if(this.fData.tipo_parametro==="CUENTA_CONTABLE"){
      entity.values.valor=this.fData.valor_cuenta_contable[0].id;
    }
    else{
      entity.values.valor=this.fData.valor_valor;
    }
    this._WS.Generic().put(JSON.stringify(entity)).subscribe((res) => this.onSave(res,UPDATE));
  }

  private static doDelete(){
    let id:number  = 0;
    const index = this.list.indexOf(this.item);
    console.log("index list: "+index+"===Parámetro Lista: "+this.list[index]);
    id=this.list[index][0];

    let entity = {
      "entity":"parametros",
      "id": id
    }

    console.log(JSON.stringify(entity));

    swal(
      {
        title: "Eliminar",
        text: "¿Desea eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok borrar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
      },
      isConfirm => {
        if (isConfirm) {
          this.list.splice(index, 1);
          let options = new RequestOptions({
            body : entity
          });
          this._WS.Generic().remove(options).subscribe(res => {
            console.log(res);
            this.toastr.success("Parámetro Global borrado con exíto");
          });
          swal("Borrado!", "Se borró con exito.", "success");
        }
      }
    );

  }

  private static showError(error:any = {content:[],columns:[]}){
    this.dialog.close();
    this.toastr.error(error.content);
  }

  private static onSave(result, status:string){
    this.dialog.close();
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);

    switch (this.scope){
      case GLOBAL:
        switch (status){
          case CREATE:
            this.toastr.success("Se guardo un nuevo Parámetro Global");
            break;

          case UPDATE:
            this.toastr.success("Se edito el Parámetro GLobal");
            break;
        }
        break;

      case DISPATCHING:
        switch (status){
          case CREATE:
            this.toastr.success("Se guardo un nuevo Parámetro Despacho");
            break;

          case UPDATE:
            this.toastr.success("Se edito el Parámetro Despacho");
            break;
        }
        break;

      case RFC:
        switch (status){
          case CREATE:
            this.toastr.success("Se guardo un nuevo Parámetro RFC");
            break;

          case UPDATE:
            this.toastr.success("Se edito el Parámetro RFC");
            break;
        }
        break;
    }
  }
}

