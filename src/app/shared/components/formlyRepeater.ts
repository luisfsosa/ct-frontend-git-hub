import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TemplateService } from "./../../core/api/templates.service";
import { UserLogin } from "./../../core/api/user.service";
import { URLSearchParams, RequestOptions } from "@angular/http";
import { WSClient } from "./../../core/api/client.service";
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";

import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from '@ngx-formly/core';
import * as clonedeep from 'lodash.clonedeep';

@Component({
  selector: "selector-repeater",
  template: `
    <div class="form-group">
    <label>{{to.label}}</label>
    <div class="row" *ngFor="let control of formControl.controls; let i = index;">
    <div class="col-md-11">
    <formly-form
    [model]="model[i]"
    [fields]="fields(i)"
    [options]="newOptions"
    [form]="this.formControl.at(i)"
      >
    </formly-form>
    </div>
    <div class="col-md-1">
      <a class="btn btn-xs btn-danger" (click)="remove(i)"><i class="fa fa-times"></i></a>
    </div>
  </div>
  <div style="margin:30px 0;">
    <a class="btn btn-success" (click)="add()"><i class="fa fa-plus"></i> Añadir Item</a>
  </div>

  </div>
    `
})
export class FormlyRepeater  extends FieldType implements OnInit {
  formControl: FormArray;
  _fields = [];
  constructor(
    public Templates: TemplateService,
    private builder: FormlyFormBuilder
  ) {
    super();
  }

  get newOptions() {
    return Object.assign({}, this.options);
  }
  get newFields() {
    return clonedeep(this.field.fieldArray);
  }

  ngOnInit() {
    if (this.model) {
      this.model.map(() => this.add());
    }
  }


  add() {
    const form = new FormGroup({}),
      i = this._fields.length;

    if (!this.model[i]) {
      this.model.push({});
    }

    this._fields.push(this.newFields);
    this.builder.buildForm(form, this._fields[i], this.model[i], this.newOptions);
    this.formControl.push(form);
  }

  remove(i) {
    this.formControl.removeAt(i);
    this.model.splice(i, 1);
    this._fields.splice(i, 1);
  }

  fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }
    console.log("new filds set", this.newFields)
    this._fields.splice(i, 0, this.newFields);

    return this._fields[i];
  }
}
