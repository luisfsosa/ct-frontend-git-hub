import { UserLogin } from "./../../core/api/user.service";
import { URLSearchParams, RequestOptions } from "@angular/http";
import { WSClient } from "./../../core/api/client.service";
import {Field} from '@ngx-formly/core';
import {
  Component,
  OnInit
} from "@angular/core";

@Component({
  selector: "rfc-multi-select",
  template: `
    <div class="form-group">
      <label>{{to.label}}</label>
      <ng-select [multiple]="true"
                 [formControl]="formControl"
                 [items]="to.options"
                 [disabled]="to.disabled"
                 (data)="refreshValue($event)"
                 (selected)="selected($event)"
                 (removed)="removed($event)"
                 placeholder="{{to.placeholder}}">
      </ng-select>
    </div>
  `
})
export class FormlyRfcMultiSelect extends Field implements OnInit {

  constructor(
    public _ws: WSClient,
    public _User: UserLogin){
    super()
  }
  ngOnInit(){
    const params: URLSearchParams = new URLSearchParams();
    params.set("cliente_id", this._User.getUser().cliente_id);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;

    this._ws.ClientsRFCs().get(requestOptions).subscribe(data => {
      let raw = data.json();

      const idx = {
        razon_social: raw.columns.indexOf('razon_social'),
        rfc: raw.columns.indexOf('rfc')
      }

      this.field.templateOptions.options = raw.content.map(item => {
          return {
            id: item[idx.rfc],
            text:item[idx.razon_social]+' - ' +item[idx.rfc]
          }
        }
      );
      console.log("RFCs Options",this.field.templateOptions.options);
    });
  }
  refreshValue(e){
    console.log("refresh",e)
  }
  selected(e){
    console.log("selected",e)
  }
  removed(e){
    console.log("removed",e)
  }
  typed(e){
    console.log("typed",e)
  }
}
