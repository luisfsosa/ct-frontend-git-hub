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
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Router } from "@angular/router";
import { WSClient } from "../../../core/api/client.service";
import { UserLogin } from '../../../core/api/user.service';
import { PubSubService } from "../../../shared/ngx-pubsub/ngx-pubsub.service";
import { ToastrService } from "ngx-toastr";

import {
  HEADER_EVENTS,
  RECIEVED_EVENTS
} from "../../../shared/ngx-pubsub/pubsub-actions";



@Component({
  selector: "app-xml-viewer-form",
  templateUrl: "./xml-viewer-form.component.html",
  styleUrls: ["./xml-viewer-form.component.scss"]
})
export class XmlViewerFormComponent implements OnInit, OnDestroy {
  context: any;
  public comprobante:any;

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
      this.comprobante=this.context.formModel['cfdi:Comprobante'];
    }
  }

  ngOnDestroy() {
    this.pubsub.unsubscribe(HEADER_EVENTS.FILTERS);
    this.pubsub.unsubscribe(RECIEVED_EVENTS.RELOAD)
  }

  closeDialog() {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }
}
