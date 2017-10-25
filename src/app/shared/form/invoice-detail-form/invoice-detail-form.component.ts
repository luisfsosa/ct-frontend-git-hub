import {FormState, toDatePickerWithTimeZone} from '../../../shared/form/util/form-state';
import {
  FormGroup
} from "@angular/forms";
import {
  Component,
  OnInit,
  OnDestroy
} from "@angular/core";
import { DialogRef} from "angular2-modal";
import { RequestOptions, URLSearchParams } from '@angular/http';
import { overlayConfigFactory } from "angular2-modal";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";
import { InvoiceDetailClasificationFormComponent } from '../invoice-detail-clasification-form/invoice-detail-clasification-form';
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";



@Component({
  selector: "app-invoice-detail-form",
  templateUrl: "./invoice-detail-form.component.html",
  styleUrls: ["./invoice-detail-form.component.scss"]
})
export class InvoiceDetailFormComponent implements OnInit, OnDestroy {
  context: any;
  public dataDetail:any = {content:[],columns:[]};
  public totalColumns: number;

  formData = {
    id: "",
    folio: "",
    fecha:null,
    rfc:"",
    nombre:"",
    tipo:"",
    tipo_comprobante: ""
  };

  options = {
    formState: {
      readOnly: true
    }
  };

  form: FormGroup = new FormGroup({});
  userFields: FormlyFieldConfig = [
    {
      className: "row",
      fieldGroup: [
        {
          className: 'col-md-3',
          key: "id",
          type: "input",
          templateOptions: {
            type: "text",
            label: "ID",
            disabled: true
          }
        },
        {
          className: 'col-md-3',
          key: "rfc",
          type: "input",
          templateOptions: {
            type: "text",
            label: "RFC",
            disabled: true
          }
        },
        {
          className: 'col-md-3',
          key: "nombre",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Nombre",
            disabled: true
          }
        },
        {
          className: 'col-md-3',
          key: "folio",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Folio",
            disabled: true
          }
        },
        {
          className: 'col-md-4',
          key: "fecha",
          type: "datepicker",
          templateOptions: {
            label: "Fecha",
            type: "text",
            datepickerPopup: "yyyy-MM-dd",
            disabled: true
          }
        },
        {
          className: 'col-md-3',
          key: "tipo",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Tipo",
            disabled: true
          }
        },
        {
          className: 'col-md-3',
          key: "tipo_comprobante",
          type: "input",
          templateOptions: {
            type: "text",
            label: "Tipo Comprobante",
            disabled: true
          }
        }
      ]
    }
  ];

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

    if(this.context && this.context.formModel){
      this.formData=this.context.formModel;
      this.formData.fecha =toDatePickerWithTimeZone(this.formData.fecha);
    }

    this.loadDetailList();

    this.pubsub.subscribe(HEADER_EVENTS.FILTERS, () => {
      this.loadDetailList();
    });

    this.pubsub.subscribe(RECIEVED_EVENTS.RELOAD, ()=>{
      this.loadDetailList();
    })
  }

  ngOnDestroy() {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }

  loadDetailList(){
    const params: URLSearchParams = new URLSearchParams();
    const requestOptions = new RequestOptions();
    params.set("id", this.formData.id);
    requestOptions.params = params;
    this._WS.Detail()
      .get(requestOptions)
      .subscribe(data => {
          this.dataDetail=data.json();
        }
      );
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  isAllChecked(){
    return this.dataDetail.content.every( x => (x[this.totalColumns] === true));
  }

  checkAll(ev){
    if (this.dataDetail && this.dataDetail.content.length > 0) {
      this.dataDetail.content.forEach(
        x => (x[this.totalColumns] = ev.target.checked)
      );
    }
  }

  clasify(){
    let selectedItems=[];

    selectedItems = this.dataDetail.content
        .filter(x => x[this.totalColumns] == true)
        .map(x => x);

    if(selectedItems.length<=0){
      this.toastr.success("Debes Seleccionar al menos un Detalle");
      return;
    }

    this.modal.open(
      InvoiceDetailClasificationFormComponent,
      overlayConfigFactory({idInvoice:this.formData.id,selectedItems: selectedItems})
    );
  }
}
