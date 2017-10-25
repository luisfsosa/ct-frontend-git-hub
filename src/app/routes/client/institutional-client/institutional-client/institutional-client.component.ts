import { FormState} from '../../../../shared/form/util/form-state';
import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { overlayConfigFactory } from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { WSClient } from '../../../../core/api/client.service';
import { UserLogin } from '../../../../core/api/user.service';
import { PubSubService } from "../../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { InstitutionalClientFormComponent } from "../institutional-client-form/institutional-client-form.component";
import { InstitutionalClientEditFormComponent } from "../institutional-client-form/institutional-client-edit-form.component";

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../../shared/ngx-pubsub/pubsub-actions";

const swal = require("sweetalert");

@Component({
  selector: 'app-institutional-client',
  templateUrl: './institutional-client.component.html',
  styleUrls: ['./institutional-client.component.scss']
})
export class InstitutionalClientComponent implements OnInit, OnDestroy {
  public data:any = {content:[],columns:[]};
  id:number  = 0;

  constructor(
    public modal: Modal,
    public _WS: WSClient,
    public _User: UserLogin,
    private pubsub: PubSubService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.load();

    this.pubsub.subscribe(HEADER_EVENTS.FILTERS, () => {
      this.load();
    });

    this.pubsub.subscribe(RECIEVED_EVENTS.RELOAD, ()=>{
      this.load();
    })
  }

  ngOnDestroy(): void {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }

  setData = data => (this.data = data.json());

  load(){
    this.data = [];
    const params: URLSearchParams = new URLSearchParams();

    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._WS.Book()
      .get(requestOptions)
      .subscribe(data => this.setData(data));
  }

  add() {
    this.modal.open(InstitutionalClientFormComponent,new FormState("EDIT"));
  }

  update(item){
    this.modal.open(
      InstitutionalClientEditFormComponent,
      overlayConfigFactory({selected: item})
    );
  }

  remove(item, list) {
    const index = list.indexOf(item);
    console.log("index list: "+index+"===Libro Lista: "+list[index]);
    this.id=list[index][0]
    let Account = {
      "entity":"libros",
      "id": this.id
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
          this.delete(JSON.stringify(Account));
          swal("Borrado!", "Se borró con exito.", "success");
        }
      }
    );
  }

  delete(account){
    let options = new RequestOptions({
      body : account
    });
    this._WS.Generic().remove(options).subscribe(res => {
      console.log(res);
      this.toastr.success("Cliente Institucional borrado con exíto");
    });
    return false;
  }

  notItemsSelected(){
    return swal("No Seleccionaste Ningún Cliente Institucional!", "Por favor seleciona uno.", "error");
  }
}
