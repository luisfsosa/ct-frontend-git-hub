import { MovementsForm } from './movementsForm';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap/';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { URLSearchParams, RequestOptions } from "@angular/http";
import { WSClient } from "./../../../core/api/client.service";
import { Component, OnInit, Input, Output, ViewContainerRef, ViewChild, TemplateRef } from "@angular/core";


@Component({
  selector: "quo-movements-btn",
  template: `
  <div class="btn-group" dropdown>
  <button dropdownToggle type="button" class="btn btn-primary dropdown-toggle">
    {{buttonText}} <span class="caret"></span>
  </button>
  <ul *dropdownMenu class="dropdown-menu" role="menu">
    <li role="menuitem" *ngFor="let item of movesList">
        <a class="dropdown-item" (click)="openForm(item)">Crear {{item[1]}}</a>
    </li>
  </ul>
</div>
    `
})
export class MovementSelector implements OnInit {
    @ViewChild('templateRef') public templateRef: TemplateRef<any>;
  @Input() buttonText: String = "Seleccionar Movimiento";
  @Input() type: string;
  public movesList = [];
  constructor(
      private _ws: WSClient,
      overlay: Overlay,
      vcRef: ViewContainerRef,
      public modal: Modal,
    ) {}
  ngOnInit() {
    const params: URLSearchParams = new URLSearchParams();
    params.set("libro", this.type);
    const requestOptions = new RequestOptions();
    requestOptions.params = params;
    this._ws.ListMovements().get(requestOptions).subscribe(res => {
      this.movesList = res.json().content;
      console.log('Buttton Moves List', this.movesList)
    });
  }
  openForm(formType) {
      console.log("FormType",formType);
      this.modal.open(MovementsForm, overlayConfigFactory({mode:"NEW",formType:formType}))
  }
}
