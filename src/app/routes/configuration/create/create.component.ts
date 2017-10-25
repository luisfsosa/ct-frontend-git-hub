import { EditFormComponent } from './../../../shared/components/editformuser';
import { UserFormComponent, FormState} from './../user-form/user-form.component';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import { ContextMenuComponent } from "ngx-contextmenu";
import { Overlay, overlayConfigFactory } from "angular2-modal";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { DialogRef, ModalComponent, CloseGuard } from "angular2-modal";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from "../../../core/api/user.service";
import { createObject } from "../../../shared/utils/index";
import { ToastrService } from "ngx-toastr";
import { PubSubService } from "./../../../shared/ngx-pubsub/ngx-pubsub.service";
import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "./../../../shared/ngx-pubsub/pubsub-actions";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { FormlyFieldConfig } from '@ngx-formly/core';


const swal = require("sweetalert");

import * as _ from "lodash";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit, OnDestroy {
  public data:any = {content:[],columns:[]};
  public totalColumns: number;
  id_user:number  = 0;
  constructor(
    private http: Http,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal,
    public _WS: WSClient,
    public _User: UserLogin,
    private pubsub: PubSubService,
    //public dialog: DialogRef<FormState>,
    public toastr: ToastrService
  ) {

  }
  ngOnInit() {
    this.loadList();

    this.pubsub.subscribe(HEADER_EVENTS.FILTERS, () => {
      this.loadList();
    });

    this.pubsub.subscribe(RECIEVED_EVENTS.RELOAD, ()=>{
      this.loadList();
    })

  }

  ngOnDestroy() {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }

  setData = data => {
    this.data = data.json();
    this.data.columns.splice(5,1);
    for (var index = 0; index < this.data.content.length; index++) {
      this.data.content[index].splice(5,1);
    }
    let content = this.data.content
    let groupData = _.chain(content)
    .groupBy("1")
    .toPairs()
    .map(item => _.zipObject(["1", "bank_accounts"], item))
    .value();

  }

  loadList() {
    this.data = [];
    const params: URLSearchParams = new URLSearchParams();

    params.set("cliente_id", this._User.getUser().cliente_id);

    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._WS
      .Users()
      .get(requestOptions)
      .subscribe(data => this.setData(data));
      console.log(this.data);
  }

  AddUser(){
    this.modal.open(UserFormComponent, new FormState("EDIT"));
  }

  remove(item, list) {
    const index = list.indexOf(item);
    console.log("index list: "+index+"===Usuario Lista: "+list[index]);
    this.id_user=list[index][0]
     let Account = {
        "entity":"usuarios",
        "id": this.id_user
     }

    console.log(JSON.stringify(Account));

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
          list.splice(index, 1);
          let borrar =this.deleteUser(JSON.stringify(Account));
          swal("Borrado!", "Se borro con exito.", "success");
        }
      }
    );
  }

  deleteUser(userData){
    this._WS.Generic().removeOptions(userData).subscribe(res => {
          console.log(res);
          this.toastr.success("usuario borrado con exíto");
        });

    return false;
  }

  notItemsSelected(){
    return swal("No Seleccionaste Ningún Usuario!", "Por favor seleciona uno.", "error");
  }

  updateform(item){

    const params: URLSearchParams = new URLSearchParams();
    params.set("cliente_id", this._User.getUser().cliente_id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    this._WS.ClientsRFCs().get(requestOptions).subscribe(data => {
        this.modal.open(
          EditFormComponent,
          overlayConfigFactory({selected: item, rfcs: data.json()})
        );

      }
    );
  }
}
