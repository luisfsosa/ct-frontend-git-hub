import {FormState, toDatePickerWithTimeZone} from '../../../shared/form/util/form-state';
import { RequestOptions, URLSearchParams } from '@angular/http';
import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { DialogRef} from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { Invoice } from "./invoice";

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";



@Component({
  selector: "app-edit-invoice-form",
  templateUrl: "./edit-invoice-form.component.html",
  styleUrls: ["./edit-invoice-form.component.scss"]
})
export class EditInvoiceFormComponent implements OnInit, OnDestroy {
  context: any;
  public comprobante:any;
  public invoice:Invoice;
  public data:any = {content:[],columns:[]};
  public moneyList:any [];

  constructor(
    public dialog: DialogRef<FormState>,
    public modal: Modal,
    public _WS: WSClient,
    public _User: UserLogin,
    public router: Router,
    public pubsub: PubSubService,
    public toastr: ToastrService,
  ) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  ngOnInit() {
    this.loadMoneyList();

    this.invoice=new Invoice();
    if(this.context && this.context.formModel){
      this.comprobante=this.context.formModel['cfdi:Comprobante'];
      this.invoice.tipoCambio=this.comprobante['@TipoCambio'];
      this.invoice.moneda=this.comprobante['@Moneda'];
    }

    if(this.context && this.context.id){
      this.invoice.id=this.context.id;
    }

  }

  ngOnDestroy() {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }

  loadMoneyList(){
    this.moneyList = [];
    this.data = [];
    const params: URLSearchParams = new URLSearchParams();

    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._WS.Currencies()
      .get(requestOptions)
      .subscribe(data => {
        this.data=data.json();

        const code=this.data.columns.indexOf('codigo');

        this.data.content.forEach(item =>{
          this.moneyList.push(item[code]);
        })
      });
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  saveForm() {

    let entity = {
      moneda: this.invoice.moneda,
      tipo_cambio: this.invoice.tipoCambio,
     // descuento:"",
     // subtotal: "",
     // total:""
    };

    console.log(JSON.stringify(entity));


    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();
    params.set("id", this.invoice.id.toString());
    requestOptions.params = params;

    console.log("el id del "+this.invoice.id);
    console.log("los parametros"+params);
    this._WS.editInvoice().post(JSON.stringify(entity),requestOptions).subscribe(
      (res) => this.onSave(res));
  }

  private onSave(result) {
    this.closeDialog();

    console.log("esta es la respuesta"+result.json());
    this.pubsub.publish(RECIEVED_EVENTS.RELOAD);
    this.toastr.success("Se guardó el cambio en la Factura");
  }
}

