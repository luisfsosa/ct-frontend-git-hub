import { Component} from "@angular/core";
import {FormlyFieldSelect} from '@ngx-formly/bootstrap';

@Component({
  selector: "multiSelect",
  template: `
    <select [formControl]="formControl" multiple class="form-control" [formlyAttributes]="field">
      <option value="" *ngIf="to.placeholder">{{ to.placeholder }}</option>
      <ng-container *ngFor="let item of selectOptions">
        <optgroup *ngIf="item.group" label="{{item.label}}">
          <option *ngFor="let child of item.group" [value]="child.value" [disabled]="item.disabled">
            {{ child.label }}
          </option>
        </optgroup>
        <option *ngIf="!item.group" [value]="item.value" [disabled]="item.disabled">{{ item.label }}</option>
      </ng-container>
    </select>
    `
})
export class FormlyFieldMultiSelect extends  FormlyFieldSelect {
  constructor() {
    super();
  }
}
